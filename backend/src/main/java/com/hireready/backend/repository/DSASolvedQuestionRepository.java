package com.hireready.backend.repository;

import com.hireready.backend.model.DSASolvedQuestion;
import com.hireready.backend.model.DSAQuestion;
import com.hireready.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DSASolvedQuestionRepository extends JpaRepository<DSASolvedQuestion, Long> {
    List<DSASolvedQuestion> findByUser(User user);
    Optional<DSASolvedQuestion> findByUserAndQuestion(User user, DSAQuestion question);
    long countByUser(User user);
}
