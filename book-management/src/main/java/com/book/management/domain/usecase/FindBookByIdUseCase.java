package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import java.util.Optional;

public class FindBookByIdUseCase {

  private final BookRepository bookRepository;

  public FindBookByIdUseCase(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public Optional<Book> find(Long id) {
    return bookRepository.findById(id);
  }
}