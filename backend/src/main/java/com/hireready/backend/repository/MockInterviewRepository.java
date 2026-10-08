package com.hireready.backend.repository;

import com.hireready.backend.model.MockInterview;
import com.hireready.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MockInterviewRepository extends JpaRepository<MockInterview, Long> {
    List<MockInterview> findByUser(User user);
}
