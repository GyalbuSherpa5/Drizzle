package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.resources.response.UserKycResponse;
import com.gyalbu.drizzle_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsersHandler() {

        List<User> user = userService.findAllUsers();
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/getAllUnverifiedUsers")
    public ResponseEntity<List<UserKycResponse>> getAllUnverifiedUsersHandler() {

        List<UserKycResponse> user = userService.findAllUnverifiedUsers();
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @PostMapping("{userId}/{kycStatus}")
    public String updatePaymentStatus(@PathVariable("userId") Long userId,
                                                      @PathVariable("kycStatus") String kycStatus) throws UserException {

        return userService.updateKycStatus(userId, kycStatus);
    }
}
