package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
