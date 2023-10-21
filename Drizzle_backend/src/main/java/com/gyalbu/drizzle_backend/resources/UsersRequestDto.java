package com.gyalbu.drizzle_backend.resources;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersRequestDto {
    private String username;

    private String firstName;

    private String middleName;

    private String lastName;

    private String password;

    private String email;

    private String mobileNumber;
}
