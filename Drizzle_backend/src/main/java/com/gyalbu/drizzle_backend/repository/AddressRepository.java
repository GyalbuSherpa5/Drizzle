package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
