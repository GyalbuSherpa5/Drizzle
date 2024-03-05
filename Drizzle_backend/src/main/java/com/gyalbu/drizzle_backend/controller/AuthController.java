package com.gyalbu.drizzle_backend.controller;

import com.gyalbu.drizzle_backend.config.JwtProvider;
import com.gyalbu.drizzle_backend.entity.User;
import com.gyalbu.drizzle_backend.entity.UserKYC;
import com.gyalbu.drizzle_backend.enums.UserStatus;
import com.gyalbu.drizzle_backend.exception.UserException;
import com.gyalbu.drizzle_backend.repository.UserKYCRepository;
import com.gyalbu.drizzle_backend.repository.UserRepository;
import com.gyalbu.drizzle_backend.resources.request.LoginRequest;
import com.gyalbu.drizzle_backend.resources.response.AuthResponse;
import com.gyalbu.drizzle_backend.service.CartService;
import com.gyalbu.drizzle_backend.service.EmailService;
import com.gyalbu.drizzle_backend.service.impl.CustomUserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final UserKYCRepository userKYCRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImpl customUserService;
    private final EmailService emailService;

    @PostMapping("/sign_up")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setUserStatus(UserStatus.ACTIVE);

        if(user.getRole() != null) {
            createdUser.setRole(user.getRole());
        } else {
            createdUser.setRole("USER");
        }

        User savedUser = userRepository.save(createdUser);
        cartService.createCart(savedUser);

        UserKYC kycUser = new UserKYC();
        kycUser.setUser(savedUser);
        userKYCRepository.save(kycUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication, savedUser);

        AuthResponse authResponse = new AuthResponse(token, "Sign-up success");

        log.info("User with name : {} created successfully", firstName);
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/sign_in")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException {

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User isEmailExist = userRepository.findByEmail(username);
        if (isEmailExist == null) {
            throw new UserException("Email is already used with another account");
        }

        String token = jwtProvider.generateToken(authentication, isEmailExist);
        AuthResponse authResponse = new AuthResponse(token, "Sign-in success");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username...");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @GetMapping("/send-email")
    public ResponseEntity<String> sendEmailHandler() {
//        emailService.email("gyalbu@gmail.com", "Test email", "This is a test email");
        emailService.set();
        return new ResponseEntity<>("Email sent", HttpStatus.ACCEPTED);
    }
}
