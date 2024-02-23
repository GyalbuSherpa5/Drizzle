package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.repository.RatingRepository;
import com.gyalbu.drizzle_backend.resources.request.RatingRequest;
import com.gyalbu.drizzle_backend.service.ProductService;
import com.gyalbu.drizzle_backend.service.RatingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final ProductService productService;
    private final RatingRepository ratingRepository;
    @Override
    public Rating createRating(RatingRequest request, User user) throws ProductException {

        Product product = productService.findProductById(request.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(request.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        Rating rating1 = ratingRepository.findRatingByUserAndProductId(user.getId(),request.getProductId());

        if(rating1 != null){
            rating1.setRating(request.getRating());
            return ratingRepository.save(rating1);
        }
        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {
        log.info("Getting all ratings");
        return ratingRepository.getAllProductsRating(productId);
    }
}
