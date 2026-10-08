package com.hireready.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OllamaService {

    @Value("${ollama.base-url}")
    private String ollamaUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateFeedback(String jobTitle, String resumeContent) {
        String prompt = String.format(
                "You are an expert interviewer. Analyze this resume content for a %s position and provide detailed feedback, typical interview questions, and a confidence score (0-100). \n\nResume: %s",
                jobTitle, resumeContent
        );

        Map<String, Object> request = new HashMap<>();
        request.put("model", "llama3"); // Defaulting to llama3, can be configurable
        request.put("prompt", prompt);
        request.put("stream", false);

        try {
            Map<String, Object> response = restTemplate.postForObject(ollamaUrl, request, Map.class);
            return (String) response.get("response");
        } catch (Exception e) {
            return "Error communicating with AI: " + e.getMessage();
        }
    }
}
