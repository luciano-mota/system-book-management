package com.book.management.domain.usecase;

import com.book.management.domain.model.BookPage;
import com.book.management.domain.repository.BookRepository;

public record FindAllBookUseCase(BookRepository bookRepository) {

  public BookPage find(Integer page, Integer size, String name) {
    return bookRepository.findAll(page, size, name);
  }
}