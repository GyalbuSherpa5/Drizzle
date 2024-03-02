package com.gyalbu.drizzle_backend.resources.response;

import com.gyalbu.drizzle_backend.enums.KycStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKycResponse {
    private Long id;
    private String username;
    private String email;
    private KycStatus kycStatus;
}
