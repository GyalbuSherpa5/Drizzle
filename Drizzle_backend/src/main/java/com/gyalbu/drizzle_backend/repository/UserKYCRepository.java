package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.UserKYC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserKYCRepository extends JpaRepository<UserKYC, Long> {
}
