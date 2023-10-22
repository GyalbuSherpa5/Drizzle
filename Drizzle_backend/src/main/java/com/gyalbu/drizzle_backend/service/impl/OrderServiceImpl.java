package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Address;
import com.gyalbu.drizzle_backend.entity.Order;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.OrderException;
import com.gyalbu.drizzle_backend.repository.CartRepository;
import com.gyalbu.drizzle_backend.service.CartService;
import com.gyalbu.drizzle_backend.service.OrderService;
import com.gyalbu.drizzle_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final CartService cartService;
    private final ProductService productService;

    @Override
    public Order createOrder(User user, Address address) {
        return null;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return null;
    }

    @Override
    public Order placeOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order cancelledOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> getAllOrders() {
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {

    }
}
