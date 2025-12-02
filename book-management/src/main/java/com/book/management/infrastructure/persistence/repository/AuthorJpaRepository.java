package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuthorJpaRepository extends JpaRepository<AuthorEntity, Long> {

  @Query(
      value = """
          SELECT * FROM tb_author a
          WHERE (:name IS NULL OR UPPER(a.name) LIKE UPPER(CONCAT('%', :name, '%')))
          ORDER BY a.name ASC
          """,
      nativeQuery = true
  )
  List<AuthorEntity> findAllAuthorOrByName(@Param("name") String name);
}