package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.resources.UsersRequestDto;

public interface UsersService {
    String registerNewUser(UsersRequestDto usersRequestDto, String role);
}
