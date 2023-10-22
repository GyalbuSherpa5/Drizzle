package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.enums.UserStatus;
import com.gyalbu.drizzle_backend.repository.UsersRepository;
import com.gyalbu.drizzle_backend.resources.UsersRequestDto;
import com.gyalbu.drizzle_backend.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;

    @Override
    public String registerNewUser(UsersRequestDto usersRequestDto, String role) {
return "o";
    }
}
