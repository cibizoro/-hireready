package com.hireready.backend.repository;

import com.hireready.backend.model.DSAQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DSAQuestionRepository extends JpaRepository<DSAQuestion, Long> {
    List<DSAQuestion> findByCategory(String category);
    List<DSAQuestion> findByDifficulty(String difficulty);
}
