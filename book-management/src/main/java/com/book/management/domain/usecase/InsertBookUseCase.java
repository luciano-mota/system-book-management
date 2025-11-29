package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public class InsertBookUseCase {

  private final BookRepository bookRepository;

  public InsertBookUseCase(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public Book insert(Book book) {
    return bookRepository.save(book);
  }
}