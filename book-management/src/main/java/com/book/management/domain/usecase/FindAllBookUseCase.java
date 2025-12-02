package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import java.util.List;

public record FindAllBookUseCase(BookRepository bookRepository) {

  public List<Book> find(String name) {
    return bookRepository.findAll(name);
  }
}