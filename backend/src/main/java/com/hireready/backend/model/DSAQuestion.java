package com.hireready.backend.model;

import jakarta.persistence.*;

@Entity
public class DSAQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String difficulty; // Easy, Medium, Hard
    private String category; // Array, String, Linked List, etc.

    @Column(columnDefinition = "TEXT")
    private String exampleInput;
    
    @Column(columnDefinition = "TEXT")
    private String exampleOutput;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    @Column(columnDefinition = "TEXT")
    private String testCaseInput;

    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    public DSAQuestion() {}

    public DSAQuestion(Long id, String title, String description, String difficulty, String category, 
                       String exampleInput, String exampleOutput, String constraints, 
                       String testCaseInput, String expectedOutput) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.category = category;
        this.exampleInput = exampleInput;
        this.exampleOutput = exampleOutput;
        this.constraints = constraints;
        this.testCaseInput = testCaseInput;
        this.expectedOutput = expectedOutput;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getExampleInput() { return exampleInput; }
    public void setExampleInput(String exampleInput) { this.exampleInput = exampleInput; }
    public String getExampleOutput() { return exampleOutput; }
    public void setExampleOutput(String exampleOutput) { this.exampleOutput = exampleOutput; }
    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }
    public String getTestCaseInput() { return testCaseInput; }
    public void setTestCaseInput(String testCaseInput) { this.testCaseInput = testCaseInput; }
    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

    public static DSAQuestionBuilder builder() {
        return new DSAQuestionBuilder();
    }

    public static class DSAQuestionBuilder {
        private Long id;
        private String title;
        private String description;
        private String difficulty;
        private String category;
        private String exampleInput;
        private String exampleOutput;
        private String constraints;
        private String testCaseInput;
        private String expectedOutput;

        public DSAQuestionBuilder id(Long id) { this.id = id; return this; }
        public DSAQuestionBuilder title(String title) { this.title = title; return this; }
        public DSAQuestionBuilder description(String description) { this.description = description; return this; }
        public DSAQuestionBuilder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
        public DSAQuestionBuilder category(String category) { this.category = category; return this; }
        public DSAQuestionBuilder exampleInput(String exampleInput) { this.exampleInput = exampleInput; return this; }
        public DSAQuestionBuilder exampleOutput(String exampleOutput) { this.exampleOutput = exampleOutput; return this; }
        public DSAQuestionBuilder constraints(String constraints) { this.constraints = constraints; return this; }
        public DSAQuestionBuilder testCaseInput(String testCaseInput) { this.testCaseInput = testCaseInput; return this; }
        public DSAQuestionBuilder expectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; return this; }

        public DSAQuestion build() {
            return new DSAQuestion(id, title, description, difficulty, category, exampleInput, exampleOutput, constraints, testCaseInput, expectedOutput);
        }
    }
}
