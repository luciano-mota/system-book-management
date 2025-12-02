package com.book.management.domain.usecase;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;

public record UpdateAuthorUseCase(AuthorRepository authorRepository) {

  public Author update(Author author) {
    return authorRepository.update(author);
  }
}