package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.resources.RoleRequestDto;

public interface RoleService {
    String createNewRole(RoleRequestDto roleRequestDto);
}
