package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, String> {
}
