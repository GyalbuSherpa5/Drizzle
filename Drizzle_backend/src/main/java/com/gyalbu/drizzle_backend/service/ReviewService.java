package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.Review;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.resources.request.ReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(ReviewRequest request, User user) throws ProductException;

    List<Review> getAllReview(Long productId);

    Review getReviewByProductId(Long productId, User user);
}
