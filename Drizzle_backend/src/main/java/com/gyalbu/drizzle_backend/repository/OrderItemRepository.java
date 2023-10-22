package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
