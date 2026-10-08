package com.hireready.backend.controller;

import com.hireready.backend.model.DSAQuestion;
import com.hireready.backend.model.DSASolvedQuestion;
import com.hireready.backend.model.User;
import com.hireready.backend.repository.DSAQuestionRepository;
import com.hireready.backend.repository.DSASolvedQuestionRepository;
import com.hireready.backend.repository.UserRepository;
import com.hireready.backend.service.Judge0Service;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dsa")
public class DSAController {

    private final DSAQuestionRepository repository;
    private final DSASolvedQuestionRepository solvedRepository;
    private final UserRepository userRepository;
    private final Judge0Service judge0Service;

    public DSAController(DSAQuestionRepository repository, 
                         DSASolvedQuestionRepository solvedRepository,
                         UserRepository userRepository,
                         Judge0Service judge0Service) {
        this.repository = repository;
        this.solvedRepository = solvedRepository;
        this.userRepository = userRepository;
        this.judge0Service = judge0Service;
    }

    @GetMapping("/questions")
    public List<DSAQuestion> getAllQuestions(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return repository.findByCategory(category);
        }
        return repository.findAll();
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<DSAQuestion> getQuestionById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeCode(@RequestBody Map<String, Object> request) {
        String code = (String) request.get("source_code");
        int langId = (int) request.get("language_id");
        String stdin = (String) request.get("stdin");
        
        return ResponseEntity.ok(judge0Service.executeCode(code, langId, stdin));
    }

    @PostMapping("/submit/{id}")
    public ResponseEntity<Map<String, Object>> submitCode(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        String code = (String) request.get("source_code");
        int langId = (int) request.get("language_id");

        DSAQuestion question = repository.findById(id).orElse(null);
        if (question == null) return ResponseEntity.notFound().build();

        // Run execution on hidden test cases
        Map<String, Object> result = judge0Service.executeCode(code, langId, question.getTestCaseInput());
        String actualOutput = (String) result.get("stdout");
        
        // Logical verification
        boolean isCorrect = "SYSTEM_TEST_PASSED".equals(actualOutput);
        
        if (isCorrect) {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                if (solvedRepository.findByUserAndQuestion(user, question).isEmpty()) {
                    solvedRepository.save(new DSASolvedQuestion(user, question, LocalDateTime.now()));
                }
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("passed", isCorrect);
        response.put("actualOutput", isCorrect ? question.getExpectedOutput() : actualOutput);
        response.put("expectedOutput", question.getExpectedOutput());
        response.put("status", isCorrect ? "Accepted" : "Wrong Answer");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/solved-ids")
    public ResponseEntity<List<Long>> getSolvedIds() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        List<Long> solvedIds = solvedRepository.findByUser(user).stream()
                .map(s -> s.getQuestion().getId())
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(solvedIds);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        List<DSASolvedQuestion> solved = solvedRepository.findByUser(user);
        
        Map<String, Long> byDifficulty = solved.stream()
                .collect(Collectors.groupingBy(s -> s.getQuestion().getDifficulty(), Collectors.counting()));
        
        List<Map<String, Object>> history = solved.stream()
                .map(s -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("id", s.getQuestion().getId());
                    item.put("title", s.getQuestion().getTitle());
                    item.put("category", s.getQuestion().getCategory());
                    item.put("difficulty", s.getQuestion().getDifficulty());
                    item.put("solvedAt", s.getSolvedAt());
                    return item;
                })
                .sorted((a, b) -> ((LocalDateTime) b.get("solvedAt")).compareTo((LocalDateTime) a.get("solvedAt")))
                .collect(Collectors.toList());

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSolved", solved.size());
        stats.put("byDifficulty", byDifficulty);
        stats.put("history", history);

        return ResponseEntity.ok(stats);
    }
}
