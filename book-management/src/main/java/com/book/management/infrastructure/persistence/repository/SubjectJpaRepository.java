package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubjectJpaRepository extends JpaRepository<SubjectEntity, Long> {

  @Query(
      value = """
          SELECT * FROM tb_subject s
          WHERE (:description IS NULL OR UPPER(s.description)
          LIKE UPPER(CONCAT('%', :description, '%')))
          ORDER BY s.description ASC
          """,
      nativeQuery = true
  )
  List<SubjectEntity> findAllSubjectOrByDescription(@Param("description") String description);
}