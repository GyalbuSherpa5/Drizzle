package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.Address;
import com.gyalbu.drizzle_backend.entity.Order;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.OrderException;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, Address address);

    Order findOrderById(Long orderId) throws OrderException;

    List<Order> usersOrderHistory(Long userId);

    Order placeOrder(Long orderId) throws OrderException;

    Order confirmedOrder(Long orderId) throws OrderException;

    Order shippedOrder(Long orderId) throws OrderException;

    Order deliveredOrder(Long orderId) throws OrderException;

    Order cancelledOrder(Long orderId) throws OrderException;

    List<Order> getAllOrders();

    void deleteOrder(Long orderId) throws OrderException;

    Order updatePaymentStatus(Long orderId, String paymentStatus) throws OrderException;
}
