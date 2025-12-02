package com.book.management.domain.repository;

import com.book.management.domain.model.Book;
import java.util.List;

public interface BookRepository {

  Book save(Book book);

  Book findById(Long id);

  List<Book> findAll(String name);

  void deleteById(Long id);

  Book update(Book book);
}