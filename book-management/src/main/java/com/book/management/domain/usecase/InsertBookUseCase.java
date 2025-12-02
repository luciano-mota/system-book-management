package com.book.management.domain.usecase;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;

public record InsertBookUseCase(BookRepository bookRepository) {

  public Book insert(Book book) {
    var newBook = Book.newBook(
        book.getBookCode(),
        book.getTitle(),
        book.getPublisher(),
        book.getEdition(),
        book.getYearPublication(),
        book.getPrice(),
        book.getAuthorsIds(),
        book.getSubjectsIds()
    );
    return bookRepository.save(newBook);
  }
}