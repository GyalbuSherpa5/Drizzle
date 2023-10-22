package com.gyalbu.drizzle_backend.repository;

import com.gyalbu.drizzle_backend.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UsersRepository extends CrudRepository<User, String> {
}
