package com.gyalbu.drizzle_backend.util.mapper;

import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.resources.response.ProductRatingResponse;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class RatingToProductRatingResponse implements Function<Rating, ProductRatingResponse> {
    @Override
    public ProductRatingResponse apply(Rating rating) {
        return null;
    }
}
