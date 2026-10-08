package com.hireready.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_solved_questions")
public class DSASolvedQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private DSAQuestion question;

    private LocalDateTime solvedAt;

    public DSASolvedQuestion() {}

    public DSASolvedQuestion(User user, DSAQuestion question, LocalDateTime solvedAt) {
        this.user = user;
        this.question = question;
        this.solvedAt = solvedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public DSAQuestion getQuestion() { return question; }
    public void setQuestion(DSAQuestion question) { this.question = question; }
    public LocalDateTime getSolvedAt() { return solvedAt; }
    public void setSolvedAt(LocalDateTime solvedAt) { this.solvedAt = solvedAt; }
}
