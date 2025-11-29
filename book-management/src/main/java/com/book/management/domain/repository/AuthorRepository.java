package com.book.management.domain.repository;

import com.book.management.domain.model.Author;
import java.util.List;
import java.util.Optional;

public interface AuthorRepository {

  Author author(Author author);

  Optional<Author> findById(Long id);

  List<Author> findAll();

  void deleteById(Long id);
}