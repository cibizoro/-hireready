package com.hireready.backend.controller;

import com.hireready.backend.model.User;
import com.hireready.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        Map<String, Object> profile = new HashMap<>();
        profile.put("fullName", user.getFullName());
        profile.put("email", user.getEmail());
        profile.put("linkedinId", user.getLinkedinId());
        profile.put("githubId", user.getGithubId());
        profile.put("portfolioUrl", user.getPortfolioUrl());
        profile.put("photoUrl", user.getPhotoUrl());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, String>> updateProfile(@RequestBody Map<String, String> request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        if (request.containsKey("fullName")) user.setFullName(request.get("fullName"));
        if (request.containsKey("linkedinId")) user.setLinkedinId(request.get("linkedinId"));
        if (request.containsKey("githubId")) user.setGithubId(request.get("githubId"));
        if (request.containsKey("portfolioUrl")) user.setPortfolioUrl(request.get("portfolioUrl"));
        if (request.containsKey("photoUrl")) user.setPhotoUrl(request.get("photoUrl"));

        userRepository.save(user);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Profile updated successfully");
        return ResponseEntity.ok(res);
    }
}
