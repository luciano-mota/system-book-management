package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public record UpdateBookUseCase(BookRepository bookRepository, FindBookByIdUseCase findBookByIdUseCase) {

  public Book update(Book book) {
    var bookEntity = findBookByIdUseCase.find(book.getId()).get();
    return bookRepository.save(bookEntity);
  }
}