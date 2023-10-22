package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
