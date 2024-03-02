package com.gyalbu.drizzle_backend.util.mapper;

import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.resources.response.UserKycResponse;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserToUserKycMapper implements Function<User, UserKycResponse> {
    @Override
    public UserKycResponse apply(User user) {
        UserKycResponse userKycResponse = new UserKycResponse();
        userKycResponse.setId(user.getId());
        userKycResponse.setUsername(user.getFirstName() + " " + user.getLastName());
        userKycResponse.setEmail(user.getEmail());
        userKycResponse.setKycStatus(user.getKycStatus());
        return userKycResponse;
    }
}
