package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.entity.CartItem;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.CartItemException;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.resources.response.ApiResponse;
import com.gyalbu.drizzle_backend.service.CartItemService;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart_items")
@RequiredArgsConstructor
public class CartItemController {

    private final UserService userService;
    private final CartItemService cartItemService;

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @RequestBody CartItem cartItem,
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);
        CartItem updateCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);

        return new ResponseEntity<>(updateCartItem, HttpStatus.OK);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId,
                                                      @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Item deleted successfully");
        apiResponse.setStatus(true);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
