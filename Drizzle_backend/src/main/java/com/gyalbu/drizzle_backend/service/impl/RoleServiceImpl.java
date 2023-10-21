package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Role;
import com.gyalbu.drizzle_backend.mapper.RoleRequestDtoToRoleMapper;
import com.gyalbu.drizzle_backend.repository.RoleRepository;
import com.gyalbu.drizzle_backend.resources.RoleRequestDto;
import com.gyalbu.drizzle_backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleRequestDtoToRoleMapper roleRequestDtoToRoleMapper;

    @Override
    public String createNewRole(RoleRequestDto roleRequestDto) {
        log.info("Saving user role");
        Role role = roleRequestDtoToRoleMapper.apply(roleRequestDto);
        roleRepository.save(role);
        return "Role created and saved successfully";
    }
}
