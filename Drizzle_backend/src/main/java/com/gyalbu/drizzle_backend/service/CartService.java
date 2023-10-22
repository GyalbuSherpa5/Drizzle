package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.Cart;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.ProductException;
import com.gyalbu.drizzle_backend.resources.request.AddItemRequest;

public interface CartService {

    Cart createCart(User user);

    String addCartItem(Long userId, AddItemRequest request) throws ProductException;

    Cart findUserCart(Long userId);
}
