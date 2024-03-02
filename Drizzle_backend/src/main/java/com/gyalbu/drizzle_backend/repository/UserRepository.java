package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE (u.kycStatus = 'APPROVED' OR u.kycStatus = 'REJECTED' OR u.kycStatus = 'PENDING')")
    List<User> findByKycStatus();
}
