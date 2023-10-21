package com.gyalbu.drizzle_backend.resources;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequestDto {

    private String roleName;
    private String roleDescription;
}
