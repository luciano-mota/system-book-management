package com.book.management.domain.usecase;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;
import java.util.List;

public record FindAllAuthorUseCase(AuthorRepository authorRepository) {

  public List<Author> find(String name) {
    return authorRepository.findAll(name);
  }
}