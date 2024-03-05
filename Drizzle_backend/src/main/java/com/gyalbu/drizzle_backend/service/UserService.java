package com.gyalbu.drizzle_backend.service;

import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.entity.UserKYC;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.resources.request.UserKycRequest;
import com.gyalbu.drizzle_backend.resources.response.UserKycResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    User findUserById(Long userId) throws UserException;

    User findUserProfileByJwt(String jwt) throws UserException;

    List<User> findAllUsers();

    List<UserKycResponse> findAllUnverifiedUsers();

    User updateKycStatus(Long userId, String kycStatus) throws UserException;

    UserKYC submitKycForm(User user, UserKycRequest userKycRequest, MultipartFile citizenFront, MultipartFile citizenBack) throws UserException;
}
