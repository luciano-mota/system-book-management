package com.book.management.domain.usecase;

import com.book.management.domain.model.AuthorPage;
import com.book.management.domain.repository.AuthorRepository;

public record FindAllAuthorUseCase(AuthorRepository authorRepository) {

  public AuthorPage find(Integer page, Integer size, String name) {
    return authorRepository.findAll(page, size, name);
  }
}