package com.book.management.domain.usecase;

import com.book.management.domain.repository.BookRepository;

public class DeleteBookUseCase {

  private final BookRepository bookRepository;

  public DeleteBookUseCase(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public void delete(Long id) {
    if (!bookRepository.existsById(id)) {
      throw new RuntimeException("Book with ID " + id + " does not exist.");
    }
    bookRepository.deleteById(id);
  }
}