package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.resources.UsersRequestDto;
import com.gyalbu.drizzle_backend.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @PostMapping({"/registerNewUser/{role}"})
    public String registerNewUser(@RequestBody UsersRequestDto usersRequestDto,
                                  @PathVariable String role) {
        return usersService.registerNewUser(usersRequestDto, role);
    }
}
