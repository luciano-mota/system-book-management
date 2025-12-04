package com.book.management.domain.repository;

import com.book.management.domain.model.Book;
import com.book.management.domain.model.BookPage;

public interface BookRepository {

  Book save(Book book);

  Book findById(Long id);

  BookPage findAll(Integer page, Integer size, String name);

  void deleteById(Long id);

  Book update(Book book);
}