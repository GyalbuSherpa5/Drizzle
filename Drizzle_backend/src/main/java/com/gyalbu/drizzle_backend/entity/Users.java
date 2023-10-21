package com.gyalbu.drizzle_backend.entity;

import com.gyalbu.drizzle_backend.enums.UserStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;

    private String middleName;

    private String lastName;

    private String username;

    private String password;

    private String email;

    private String mobileNumber;

    private UserStatus userStatus;

    private String userProfilePictureName;
}
