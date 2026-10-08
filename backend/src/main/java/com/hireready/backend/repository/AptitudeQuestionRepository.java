package com.hireready.backend.repository;

import com.hireready.backend.model.AptitudeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AptitudeQuestionRepository extends JpaRepository<AptitudeQuestion, Long> {
    List<AptitudeQuestion> findByCategory(String category);
}
