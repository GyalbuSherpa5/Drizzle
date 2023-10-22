package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.OrderItem;
import com.gyalbu.drizzle_backend.repository.OrderItemRepository;
import com.gyalbu.drizzle_backend.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
