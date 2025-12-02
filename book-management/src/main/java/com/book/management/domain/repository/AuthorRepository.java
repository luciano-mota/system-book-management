package com.book.management.domain.repository;

import com.book.management.domain.model.Author;
import java.util.List;

public interface AuthorRepository {

  Author save(Author author);

  Author findById(Long id);

  List<Author> findAll();

  Author update(Author author);

  void deleteById(Long id);
}