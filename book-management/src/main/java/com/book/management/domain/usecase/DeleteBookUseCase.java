package com.book.management.domain.usecase;

import com.book.management.domain.repository.BookRepository;

public record DeleteBookUseCase(BookRepository bookRepository) {

  public void delete(Long id) {
    if (!bookRepository.existsById(id)) {
      throw new RuntimeException("Book with ID " + id + " does not exist.");
    }
    bookRepository.deleteById(id);
  }
}