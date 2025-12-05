package com.book.management.domain.repository;

import com.book.management.domain.model.Author;
import com.book.management.domain.model.AuthorPage;

public interface AuthorRepository {

  Author save(Author author);

  Author findById(Long id);

  AuthorPage findAll(Integer page, Integer size, String name);

  Author update(Author author);

  void deleteById(Long id);
}