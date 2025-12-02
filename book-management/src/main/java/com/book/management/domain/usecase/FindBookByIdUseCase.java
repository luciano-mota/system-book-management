package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public record FindBookByIdUseCase(BookRepository bookRepository) {

  public Book find(Long id) {
    return bookRepository.findById(id);
  }
}