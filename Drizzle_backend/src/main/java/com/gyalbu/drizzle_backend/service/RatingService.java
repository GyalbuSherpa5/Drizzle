package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.resources.request.RatingRequest;

import java.util.List;

public interface RatingService {

    Rating createRating(RatingRequest request, User user) throws ProductException;

    List<Rating> getProductsRating(Long productId);

    Double getProductsAverageRating(Long productId);

    Rating getRatingByProductId(Long productId, User user);
}
