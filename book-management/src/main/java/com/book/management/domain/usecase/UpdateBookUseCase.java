package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public class UpdateBookUseCase {

  private final BookRepository bookRepository;

  public UpdateBookUseCase(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public Book update(Book book) {
    if (!bookRepository.existsById(book.getId())) {
      throw new RuntimeException("Book with ID " + book.getId() + " does not exist.");
    }
    return bookRepository.save(book);
  }
}