package com.hireready.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class MockInterview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String jobTitle;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
    private int score;
    
    private LocalDateTime sessionDate;

    public MockInterview() {}

    public MockInterview(Long id, User user, String jobTitle, String feedback, int score, LocalDateTime sessionDate) {
        this.id = id;
        this.user = user;
        this.jobTitle = jobTitle;
        this.feedback = feedback;
        this.score = score;
        this.sessionDate = sessionDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public LocalDateTime getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDateTime sessionDate) { this.sessionDate = sessionDate; }

    public static MockInterviewBuilder builder() {
        return new MockInterviewBuilder();
    }

    public static class MockInterviewBuilder {
        private Long id;
        private User user;
        private String jobTitle;
        private String feedback;
        private int score;
        private LocalDateTime sessionDate;

        public MockInterviewBuilder id(Long id) { this.id = id; return this; }
        public MockInterviewBuilder user(User user) { this.user = user; return this; }
        public MockInterviewBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public MockInterviewBuilder feedback(String feedback) { this.feedback = feedback; return this; }
        public MockInterviewBuilder score(int score) { this.score = score; return this; }
        public MockInterviewBuilder sessionDate(LocalDateTime sessionDate) { this.sessionDate = sessionDate; return this; }

        public MockInterview build() {
            return new MockInterview(id, user, jobTitle, feedback, score, sessionDate);
        }
    }
}
