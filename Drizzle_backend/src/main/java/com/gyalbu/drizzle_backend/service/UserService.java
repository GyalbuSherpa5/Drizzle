package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.UserException;

import java.util.List;

public interface UserService {

    User findUserById(Long userId) throws UserException;

    User findUserProfileByJwt(String jwt) throws UserException;

    List<User> findAllUsers();
}
