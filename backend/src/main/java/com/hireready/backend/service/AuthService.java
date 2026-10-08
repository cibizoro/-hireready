package com.hireready.backend.service;

import com.hireready.backend.model.User;
import com.hireready.backend.repository.UserRepository;
import com.hireready.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public Map<String, String> register(String fullName, String email, String password) {
        var user = User.builder()
                .fullName(fullName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role("ROLE_USER")
                .build();
        userRepository.save(user);
        
        var userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
        
        var jwtToken = jwtService.generateToken(userDetails);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        return response;
    }

    public Map<String, String> login(String email, String password) {
        System.out.println("Login attempt for email: " + email);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (Exception e) {
            System.err.println("Authentication failed for " + email + ": " + e.getMessage());
            throw e;
        }
        var user = userRepository.findByEmail(email).orElseThrow(() -> {
            System.err.println("User not found after authentication: " + email);
            return new RuntimeException("User not found");
        });
        
        System.out.println("Login successful for: " + email);
        var userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
        
        var jwtToken = jwtService.generateToken(userDetails);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        return response;
    }
}
