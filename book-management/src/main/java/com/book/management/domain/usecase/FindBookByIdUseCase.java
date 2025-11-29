package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import java.util.Optional;

public record FindBookByIdUseCase(BookRepository bookRepository) {

  public Optional<Book> find(Long id) {
    return bookRepository.findById(id);
  }
}