package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubjectJpaRepository extends JpaRepository<SubjectEntity, Long> {

  @Query("""
      SELECT s FROM SubjectEntity s
      WHERE (:description IS NULL OR UPPER(s.description)
      LIKE UPPER(CONCAT('%', :description, '%')))
      ORDER BY s.description ASC
      """)
  List<SubjectEntity> findAllSubjectEntityOrByDescription(@Param("description") String description);
}