package com.gyalbu.drizzle_backend.mapper;

import com.gyalbu.drizzle_backend.entity.Role;
import com.gyalbu.drizzle_backend.resources.RoleRequestDto;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class RoleRequestDtoToRoleMapper implements Function<RoleRequestDto, Role> {

    @Override
    public Role apply(RoleRequestDto roleRequestDto) {
        return new Role(
                roleRequestDto.getRoleName(),
                roleRequestDto.getRoleDescription()
        );
    }
}
