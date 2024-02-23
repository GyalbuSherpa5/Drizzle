package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> getUsersOrders(@Param("userId") Long userId);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (o.paymentStatus = 'FIRST' OR o.paymentStatus = 'SECOND' OR o.paymentStatus = 'THIRD')")
    List<Order> getAllUserInstallments(Long userId);

    @Query("SELECT o FROM Order o WHERE (o.paymentStatus = 'FIRST' OR o.paymentStatus = 'SECOND' OR o.paymentStatus = 'THIRD')")
    List<Order> getAllUserInstallments();
}
