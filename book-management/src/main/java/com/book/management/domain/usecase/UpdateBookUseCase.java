package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public record UpdateBookUseCase(BookRepository bookRepository) {

  public Book update(Book book) {
    if (!bookRepository.existsById(book.getId())) {
      throw new RuntimeException("Book with ID " + book.getId() + " does not exist.");
    }
    return bookRepository.save(book);
  }
}