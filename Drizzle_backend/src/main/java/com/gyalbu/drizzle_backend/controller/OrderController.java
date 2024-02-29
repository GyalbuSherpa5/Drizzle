package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.entity.Address;
import com.gyalbu.drizzle_backend.entity.Order;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.CartItemException;
import com.gyalbu.drizzle_backend.exception.OrderException;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.service.OrderService;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user, shippingAddress);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Order> orders = orderService.usersOrderHistory(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId) throws OrderException {

        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/{paymentStatus}")
    public ResponseEntity<Order> updatePaymentStatus(@PathVariable("orderId") Long orderId,
                                                     @PathVariable("paymentStatus") String paymentStatus) throws OrderException {
        Order order = orderService.updatePaymentStatus(orderId, paymentStatus);
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }

    @GetMapping("/installments")
    public ResponseEntity<List<Order>> getAllInstallments(
            @RequestParam(required=false) Long userId,
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user;
        if(userId == null){
            user = userService.findUserProfileByJwt(jwt);
        } else {
            user = userService.findUserById(userId);
        }

        List<Order> orders = orderService.getAllUserInstallments(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

}
