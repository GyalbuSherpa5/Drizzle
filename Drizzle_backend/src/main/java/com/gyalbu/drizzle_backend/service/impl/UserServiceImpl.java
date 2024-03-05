package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.config.JwtProvider;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.entity.UserKYC;
import com.gyalbu.drizzle_backend.enums.KycStatus;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.repository.UserKYCRepository;
import com.gyalbu.drizzle_backend.repository.UserRepository;
import com.gyalbu.drizzle_backend.resources.request.UserKycRequest;
import com.gyalbu.drizzle_backend.resources.response.UserKycResponse;
import com.gyalbu.drizzle_backend.service.UserService;
import com.gyalbu.drizzle_backend.util.mapper.UserToUserKycMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserKYCRepository userKYCRepository;
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
    public User updateKycStatus(Long userId, String kycStatus) throws UserException {
        User user = findUserById(userId);

        if (user == null) {
            throw new UserException("User not found with id - " + userId);
        }
        user.setKycStatus(KycStatus.valueOf(kycStatus));
        return userRepository.save(user);
    }

    @Override
    public UserKYC submitKycForm(User user, UserKycRequest userKycRequest, MultipartFile citizenFront, MultipartFile citizenBack) throws UserException {

        UserKYC userKYC = converter(userKycRequest, user.getId());

        String frontCitizenImageName = StringUtils.cleanPath(Objects.requireNonNull(citizenFront.getOriginalFilename()));
        String backCitizenImageName = StringUtils.cleanPath(Objects.requireNonNull(citizenBack.getOriginalFilename()));

        if (frontCitizenImageName.contains("..") || backCitizenImageName.contains("..")) {
            log.error("Invalid file name");
            throw new UserException("Invalid file name");
        }

        try {
            userKYC.setCitizenFront(Base64.getEncoder().encodeToString(citizenFront.getBytes()));
            userKYC.setCitizenBack(Base64.getEncoder().encodeToString(citizenBack.getBytes()));
        } catch (IOException e) {
            log.error("Error while converting image to base64");
            throw new UserException(e.getMessage());
        }
        return userKYCRepository.save(userKYC);
    }

    @Override
    public UserKYC getUserKYC(Long userId) throws UserException {
        return userKYCRepository.findById(userId)
                .orElseThrow(() -> new UserException("User KYC not found"));
    }

    private UserKYC converter(UserKycRequest userKycRequest, Long userId) throws UserException {
        UserKYC userKYC = userKYCRepository.findById(userId)
                .orElseThrow(() -> new UserException("User KYC not found"));

        userKYC.setName(userKycRequest.getName());
        userKYC.setGender(userKycRequest.getGender());
        userKYC.setBirthDate(cleanDate(userKycRequest.getBirthDate()));
        userKYC.setParentName(userKycRequest.getParentName());
        userKYC.setGrandParentName(userKycRequest.getGrandParentName());
        userKYC.setSpouseName(userKycRequest.getSpouseName());
        userKYC.setOccupation(userKycRequest.getOccupation());
        userKYC.setPanNo(userKycRequest.getPanNo());
        userKYC.setLandLineNumber(userKycRequest.getLandLineNumber());
        userKYC.setZoneP(userKycRequest.getZoneP());
        userKYC.setDistrictP(userKycRequest.getDistrictP());
        userKYC.setMunicipalityP(userKycRequest.getMunicipalityP());
        userKYC.setZoneC(userKycRequest.getZoneC());
        userKYC.setDistrictC(userKycRequest.getDistrictC());
        userKYC.setMunicipalityC(userKycRequest.getMunicipalityC());
        userKYC.setDocumentType(userKycRequest.getDocumentType());
        userKYC.setCitizenNumber(userKycRequest.getCitizenNumber());
        userKYC.setIssuedAddress(userKycRequest.getIssuedAddress());
        userKYC.setDateOfIssue(cleanDate(userKycRequest.getDateOfIssue()));

        return userKYC;
    }

    private static String cleanDate(String garbageDate) {
        SimpleDateFormat inputDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date date = inputDateFormat.parse(garbageDate);
            return outputDateFormat.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
