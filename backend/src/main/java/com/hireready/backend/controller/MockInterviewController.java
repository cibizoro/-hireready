package com.hireready.backend.controller;

import com.hireready.backend.model.MockInterview;
import com.hireready.backend.model.User;
import com.hireready.backend.repository.MockInterviewRepository;
import com.hireready.backend.repository.UserRepository;
import com.hireready.backend.service.OllamaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews")
public class MockInterviewController {

    private final MockInterviewRepository repository;
    private final UserRepository userRepository;
    private final OllamaService ollamaService;

    public MockInterviewController(MockInterviewRepository repository, UserRepository userRepository, OllamaService ollamaService) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.ollamaService = ollamaService;
    }

    @PostMapping("/start")
    public ResponseEntity<MockInterview> startInterview(@RequestBody Map<String, String> request) {
        String jobTitle = request.get("jobTitle");
        String resumeContent = request.get("resumeContent");
        
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        String feedback = ollamaService.generateFeedback(jobTitle, resumeContent);
        
        MockInterview interview = MockInterview.builder()
                .user(user)
                .jobTitle(jobTitle)
                .feedback(feedback)
                .sessionDate(LocalDateTime.now())
                .score(75) // Mock score for now
                .build();
        
        return ResponseEntity.ok(repository.save(interview));
    }

    @GetMapping("/history")
    public List<MockInterview> getHistory() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }
}
