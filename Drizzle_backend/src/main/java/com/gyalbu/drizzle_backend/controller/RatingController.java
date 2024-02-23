package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.resources.request.RatingRequest;
import com.gyalbu.drizzle_backend.resources.response.ProductRatingResponse;
import com.gyalbu.drizzle_backend.service.RatingService;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final UserService userService;
    private final RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest request,
                                               @RequestHeader("Authorization") String jwt) throws UserException, ProductException {

        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(request, user);

        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId) {

        List<Rating> ratings = ratingService.getProductsRating(productId);
        return new ResponseEntity<>(ratings, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}/average")
    public ResponseEntity<ProductRatingResponse> getProductsAverageRating(@PathVariable Long productId) throws ProductException {

        ProductRatingResponse productRatingResponse = ratingService.getProductsAverageRating(productId);
        return new ResponseEntity<>(productRatingResponse, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Rating> getRatingByProductId(@PathVariable Long productId,
                                                       @RequestParam(required = false) Long userId,
                                                       @RequestHeader("Authorization") String jwt) throws UserException {
        User user;
        if (userId == null) {
            user = userService.findUserProfileByJwt(jwt);
        } else {
            user = userService.findUserById(userId);
        }

        Rating rating = ratingService.getRatingByProductId(productId, user);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }
}
