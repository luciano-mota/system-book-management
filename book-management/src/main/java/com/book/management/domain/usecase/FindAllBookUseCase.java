package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import java.util.List;

public class FindAllBookUseCase {

  private final BookRepository bookRepository;

  public FindAllBookUseCase(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public List<Book> find() {
    return bookRepository.findAll();
  }
}
