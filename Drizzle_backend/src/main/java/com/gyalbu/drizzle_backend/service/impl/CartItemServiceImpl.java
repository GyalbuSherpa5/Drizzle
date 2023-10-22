package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Cart;
import com.gyalbu.drizzle_backend.entity.CartItem;
import com.gyalbu.drizzle_backend.entity.Product;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.CartItemException;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.repository.CartItemRepository;
import com.gyalbu.drizzle_backend.repository.CartRepository;
import com.gyalbu.drizzle_backend.service.CartItemService;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final UserService userService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem createCartItem(CartItem cartItem) {

        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserId());

        if (user.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {

        return cartItemRepository.isCartItemExist(cart, product, size, userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {

        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.findUserById(cartItem.getUserId());
        User reqUser = userService.findUserById(userId);

        if(user.getId().equals(reqUser.getId())){
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new UserException("You cannot remove another users item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {

        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);

        if(optionalCartItem.isPresent()){
            return optionalCartItem.get();
        }

        throw new CartItemException("CartItem not found with id - " + cartItemId);
    }
}
