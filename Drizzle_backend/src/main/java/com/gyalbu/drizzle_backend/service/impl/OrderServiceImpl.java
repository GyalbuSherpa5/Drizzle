package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Address;
import com.gyalbu.drizzle_backend.entity.Cart;
import com.gyalbu.drizzle_backend.entity.CartItem;
import com.gyalbu.drizzle_backend.entity.Order;
import com.gyalbu.drizzle_backend.entity.OrderItem;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.enums.OrderStatus;
import com.gyalbu.drizzle_backend.enums.PaymentStatus;
import com.gyalbu.drizzle_backend.exception.OrderException;
import com.gyalbu.drizzle_backend.repository.AddressRepository;
import com.gyalbu.drizzle_backend.repository.OrderItemRepository;
import com.gyalbu.drizzle_backend.repository.OrderRepository;
import com.gyalbu.drizzle_backend.repository.UserRepository;
import com.gyalbu.drizzle_backend.service.CartService;
import com.gyalbu.drizzle_backend.service.OrderService;
import com.gyalbu.drizzle_backend.util.ObjectUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CartService cartService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(User user, Address shippingAddress) {

        shippingAddress.setUser(user);

        Address address = addressRepository.save(shippingAddress);

        user.getAddress().add(address);
        userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem item : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscountedPrice(item.getDiscountedPrice());

            OrderItem createdOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);
        }

        Order createdorder = new Order();
        createdorder.setUser(user);
        createdorder.setOrderItems(orderItems);
        createdorder.setTotalPrice(cart.getTotalPrice());
        createdorder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
        createdorder.setDiscount(cart.getDiscount());
        createdorder.setTotalItem(cart.getTotalItem());

        createdorder.setShippingAddress(address);

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd yyyy");
        createdorder.setOrderDate(today.format(formatter));
        createdorder.setDueDate(today.plusMonths(1).format(formatter));

        createdorder.setOrderStatus(OrderStatus.PENDING);
        createdorder.setPaymentStatus(PaymentStatus.PENDING);
        createdorder.setCreatedDate(LocalDateTime.now());

        Order savedOrder = orderRepository.save(createdorder);

        for (OrderItem item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        return savedOrder;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {

        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if (orderOptional.isPresent()) {
            return orderOptional.get();
        }
        throw new OrderException("Order not exist with id " + orderId);
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        log.info("Fetching order history for user with id - " + userId);
        return orderRepository.getUsersOrders(userId);
    }

    @Override
    public Order placeOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        order.setOrderStatus(OrderStatus.PLACED);
        return order;
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        order.setOrderStatus(OrderStatus.SHIPPED);
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        order.setOrderStatus(OrderStatus.DELIVERED);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelledOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {

        Order order = findOrderById(orderId);
        orderRepository.delete(order);
    }

    @Override
    public Order updatePaymentStatus(Long orderId, String paymentStatus) throws OrderException {
        Order order = findOrderById(orderId);
        String status = ObjectUtil.getDefaultWhenThrows(() ->
                paymentStatus, null);
        order.setPaymentStatus(PaymentStatus.valueOf(status));

        if (paymentStatus.equals("COMPLETED") || paymentStatus.equals("FIRST")) {
            String orderDate = order.getOrderDate();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd yyyy");
            LocalDate parsedOrderDate = LocalDate.parse(orderDate, formatter);
            LocalDate dayAfterTomorrow = parsedOrderDate.plusDays(2);

            String deliveryDate = dayAfterTomorrow.format(formatter);
            order.setDeliveryDate(deliveryDate);
        }

        if(paymentStatus.equals("SECOND") || paymentStatus.equals("THIRD")){
            String dueDate = order.getDueDate();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd yyyy");
            LocalDate parsedDueDate = LocalDate.parse(dueDate, formatter);
            LocalDate addOneMonth = parsedDueDate.plusMonths(1);

            String newDueDate = addOneMonth.format(formatter);
            order.setDueDate(newDueDate);
            order.setFineAmount(0);
        }

        log.info("Payment status updated to " + status + " for order with id - " + orderId);
        return orderRepository.save(order);
    }
}
