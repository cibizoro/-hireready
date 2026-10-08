package com.hireready.backend.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String fullName;
    private String role; // e.g., ROLE_USER, ROLE_ADMIN
    private String linkedinId;
    private String githubId;
    private String portfolioUrl;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String photoUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<MockInterview> interviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<DSASolvedQuestion> solvedQuestions;

    public User() {}

    public User(Long id, String email, String password, String fullName, String role, Set<MockInterview> interviews) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.interviews = interviews;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getLinkedinId() { return linkedinId; }
    public void setLinkedinId(String linkedinId) { this.linkedinId = linkedinId; }
    public String getGithubId() { return githubId; }
    public void setGithubId(String githubId) { this.githubId = githubId; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public Set<MockInterview> getInterviews() { return interviews; }
    public void setInterviews(Set<MockInterview> interviews) { this.interviews = interviews; }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String password;
        private String fullName;
        private String role;
        private Set<MockInterview> interviews;

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder interviews(Set<MockInterview> interviews) { this.interviews = interviews; return this; }

        public User build() {
            return new User(id, email, password, fullName, role, interviews);
        }
    }
}
