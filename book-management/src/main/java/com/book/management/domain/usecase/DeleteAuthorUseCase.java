package com.book.management.domain.usecase;

import com.book.management.domain.repository.AuthorRepository;

public record DeleteAuthorUseCase(AuthorRepository authorRepository) {

  public void delete(Long id) {
    authorRepository.deleteById(id);
  }
}
