package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.BookEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookJpaRepository extends JpaRepository<BookEntity, Long> {

  @Query("""
      SELECT b FROM BookEntity b
      WHERE (:name IS NULL OR UPPER(b.title) LIKE UPPER(CONCAT('%', :name, '%')))
      ORDER BY b.title ASC
      """)
  List<BookEntity> findAllBooksOrByName(@Param("name") String name);
}