package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.entity.Review;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.repository.ReviewRepository;
import com.gyalbu.drizzle_backend.resources.request.ReviewRequest;
import com.gyalbu.drizzle_backend.service.ProductService;
import com.gyalbu.drizzle_backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ProductService productService;
    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(ReviewRequest request, User user) throws ProductException {

        Product product = productService.findProductById(request.getProductId());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(request.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview(Long productId) {
        log.info("Getting all reviews");
        return reviewRepository.getAllProductsReview(productId);
    }
}
