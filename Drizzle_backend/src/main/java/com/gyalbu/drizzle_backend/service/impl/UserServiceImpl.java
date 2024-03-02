package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.config.JwtProvider;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.enums.KycStatus;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.repository.UserRepository;
import com.gyalbu.drizzle_backend.resources.response.UserKycResponse;
import com.gyalbu.drizzle_backend.service.UserService;
import com.gyalbu.drizzle_backend.util.mapper.UserToUserKycMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserToUserKycMapper userToUserKycMapper;

    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            return user.get();
        }

        throw new UserException("User not found with id - " + userId);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserException("User not found with email - " + email);
        }

        return user;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<UserKycResponse> findAllUnverifiedUsers() {
        return userRepository.findByKycStatus()
                .stream().map(userToUserKycMapper).collect(Collectors.toList());
    }

    @Override
    public String updateKycStatus(Long userId, String kycStatus) throws UserException {
        User user = findUserById(userId);

        if (user != null) {
            user.setKycStatus(KycStatus.valueOf(kycStatus));
            userRepository.save(user);
            return "KYC status updated successfully";
        }
        return "user not found";
    }
}
