package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Rating;
import com.gyalbu.drizzle_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.product.id =: productId")
    List<Review> getAllProductsReview(@Param("productId")Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.id = :productId AND r.user.id = :userId")
    Review findReviewByUserAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
}
