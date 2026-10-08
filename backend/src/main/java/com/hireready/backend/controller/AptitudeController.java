package com.hireready.backend.controller;

import com.hireready.backend.model.AptitudeQuestion;
import com.hireready.backend.repository.AptitudeQuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aptitude")
public class AptitudeController {

    private final AptitudeQuestionRepository repository;

    public AptitudeController(AptitudeQuestionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/questions")
    public List<AptitudeQuestion> getQuestions(@RequestParam(required = false) String category) {
        if (category != null) {
            return repository.findByCategory(category);
        }
        return repository.findAll();
    }
}
