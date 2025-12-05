package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuthorJpaRepository extends JpaRepository<AuthorEntity, Long> {

  @Query("""
      SELECT a FROM AuthorEntity a
      WHERE (:name IS NULL OR UPPER(a.name) LIKE UPPER(CONCAT('%', :name, '%')))
      ORDER BY a.name ASC
    """)
  Page<AuthorEntity> findAllAuthorOrByName(@Param("name") String name, Pageable pageable);
}