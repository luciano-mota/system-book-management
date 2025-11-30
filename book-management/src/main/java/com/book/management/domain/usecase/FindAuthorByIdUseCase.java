package com.book.management.domain.usecase;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;
import java.util.Optional;

public record FindAuthorByIdUseCase(AuthorRepository authorRepository) {

  public Optional<Author> find(Long id) {
    return authorRepository.findById(id);
  }
}