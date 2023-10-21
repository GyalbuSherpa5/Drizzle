package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Role;
import com.gyalbu.drizzle_backend.entity.Users;
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

        Users users = new Users();
        users.setUsername(usersRequestDto.getUsername());
        users.setFirstName(usersRequestDto.getFirstName());
        users.setMiddleName(usersRequestDto.getMiddleName());
        users.setLastName(usersRequestDto.getLastName());
        users.setPassword(usersRequestDto.getPassword());
        users.setEmail(usersRequestDto.getEmail());
        users.setMobileNumber(usersRequestDto.getMobileNumber());
        users.setUserStatus(UserStatus.ACTIVE);
        users.setUserProfilePictureName("register.png");

        Role saveRole = new Role();
        saveRole.setRoleName(role);
        saveRole.setRoleDescription("New role");

        Set<Role> userRole = new HashSet<>();
        userRole.add(saveRole);

        users.setRole(userRole);

        usersRepository.save(users);

        return "user saved ";
    }
}
