package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("SELECT r FROM Rating r WHERE r.product.id =: productId")
    List<Rating> getAllProductsRating(@Param("productId")Long productId);

    @Query("SELECT r FROM Rating r WHERE r.product.id = :productId AND r.user.id = :userId")
    Rating findRatingByUserAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

}
