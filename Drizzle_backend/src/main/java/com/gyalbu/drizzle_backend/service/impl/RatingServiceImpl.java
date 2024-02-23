package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.repository.RatingRepository;
import com.gyalbu.drizzle_backend.resources.request.RatingRequest;
import com.gyalbu.drizzle_backend.resources.response.ProductRatingResponse;
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

        Rating rating1 = ratingRepository.findRatingByUserAndProductId(user.getId(), request.getProductId());

        if (rating1 != null) {
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

    @Override
    public ProductRatingResponse getProductsAverageRating(Long productId) throws ProductException {
        log.info("Getting average rating");
        Product product = productService.findProductById(productId);
        List<Rating> ratings = product.getRatings();

        int oneCount = 0;
        int twoCount = 0;
        int threeCount = 0;
        int fourCount = 0;
        int fiveCount = 0;
        int totalRating = 0;
        int numberOfRatings = product.getRatings().size();

        for (Rating rating : ratings) {
            totalRating += rating.getRating();
            if (rating.getRating() == 1) {
                oneCount++;
            }
            if(rating.getRating() == 2){
                twoCount++;
            }
            if(rating.getRating() == 3){
                threeCount++;
            }
            if(rating.getRating() == 4){
                fourCount++;
            }
            if(rating.getRating() == 5){
                fiveCount++;
            }
        }

        int averageRating = numberOfRatings > 0 ? totalRating / numberOfRatings : 0;

        ProductRatingResponse productRatingResponse = new ProductRatingResponse();
        productRatingResponse.setTotalRatingCount(numberOfRatings);
        productRatingResponse.setAverageRatingCount(averageRating);
        productRatingResponse.setOneCount(oneCount);
        productRatingResponse.setTwoCount(twoCount);
        productRatingResponse.setThreeCount(threeCount);
        productRatingResponse.setFourCount(fourCount);
        productRatingResponse.setFiveCount(fiveCount);
        return productRatingResponse;
    }

    @Override
    public Rating getRatingByProductId(Long productId, User user) {
        return ratingRepository.findRatingByUserAndProductId(user.getId(), productId);
    }
}
