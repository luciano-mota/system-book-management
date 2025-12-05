package com.book.management.domain.model;

import java.util.List;

public class BookPage {

  private List<Book> books;
  private Pagination pagination;

  public BookPage(List<Book> books, Pagination pagination) {
    this.books = books;
    this.pagination = pagination;
  }

  public List<Book> getBooks() {
    return books;
  }

  public void setBooks(List<Book> books) {
    this.books = books;
  }

  public Pagination getPagination() {
    return pagination;
  }

  public void setPagination(Pagination pagination) {
    this.pagination = pagination;
  }
}