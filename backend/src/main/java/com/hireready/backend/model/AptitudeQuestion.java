package com.hireready.backend.model;

import jakarta.persistence.*;

@Entity
public class AptitudeQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String questionText;
    
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    
    private String category; // Quantitative, Logical, Verbal

    public AptitudeQuestion() {}

    public AptitudeQuestion(Long id, String questionText, String optionA, String optionB, String optionC, String optionD, String correctAnswer, String category) {
        this.id = id;
        this.questionText = questionText;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getOptionA() { return optionA; }
    public void setOptionA(String optionA) { this.optionA = optionA; }
    public String getOptionB() { return optionB; }
    public void setOptionB(String optionB) { this.optionB = optionB; }
    public String getOptionC() { return optionC; }
    public void setOptionC(String optionC) { this.optionC = optionC; }
    public String getOptionD() { return optionD; }
    public void setOptionD(String optionD) { this.optionD = optionD; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public static AptitudeQuestionBuilder builder() {
        return new AptitudeQuestionBuilder();
    }

    public static class AptitudeQuestionBuilder {
        private Long id;
        private String questionText;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private String correctAnswer;
        private String category;

        public AptitudeQuestionBuilder id(Long id) { this.id = id; return this; }
        public AptitudeQuestionBuilder questionText(String questionText) { this.questionText = questionText; return this; }
        public AptitudeQuestionBuilder optionA(String optionA) { this.optionA = optionA; return this; }
        public AptitudeQuestionBuilder optionB(String optionB) { this.optionB = optionB; return this; }
        public AptitudeQuestionBuilder optionC(String optionC) { this.optionC = optionC; return this; }
        public AptitudeQuestionBuilder optionD(String optionD) { this.optionD = optionD; return this; }
        public AptitudeQuestionBuilder correctAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; return this; }
        public AptitudeQuestionBuilder category(String category) { this.category = category; return this; }

        public AptitudeQuestion build() {
            return new AptitudeQuestion(id, questionText, optionA, optionB, optionC, optionD, correctAnswer, category);
        }
    }
}
