package com.book.management.domain.usecase;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;

public record FindAuthorByIdUseCase(AuthorRepository authorRepository) {

  public Author find(Long id) {
    return authorRepository.findById(id);
  }
}