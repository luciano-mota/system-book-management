package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
  Page<SubjectEntity> findAllSubjectOrByDescription(@Param("description") String description, Pageable pageable);
}