package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.resources.RoleRequestDto;
import com.gyalbu.drizzle_backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping({"/createNewRole"})
    public String createNewRole(@RequestBody RoleRequestDto roleRequestDto) {
        return roleService.createNewRole(roleRequestDto);
    }
}
