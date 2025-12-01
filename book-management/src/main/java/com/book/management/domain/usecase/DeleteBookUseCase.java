package com.book.management.domain.usecase;

import com.book.management.domain.repository.BookRepository;

public record DeleteBookUseCase(BookRepository bookRepository) {

  public void delete(Long id) {
    bookRepository.findById(id);
    bookRepository.deleteById(id);
  }
}