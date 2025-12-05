package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookJpaRepository extends JpaRepository<BookEntity, Long> {

  @Query("""
    SELECT b FROM BookEntity b
    WHERE (:title IS NULL OR UPPER(b.title) LIKE UPPER(CONCAT('%', :title, '%')))
    ORDER BY b.title ASC
""")
  Page<BookEntity> findAllBooksOrByName(@Param("title") String title, Pageable pageable);
}