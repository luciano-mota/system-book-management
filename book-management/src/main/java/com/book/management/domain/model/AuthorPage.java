package com.book.management.domain.model;

import java.util.List;

public class AuthorPage {

  private List<Author> authors;
  private Pagination pagination;

  public AuthorPage(List<Author> authors, Pagination pagination) {
    this.authors = authors;
    this.pagination = pagination;
  }

  public List<Author> getAuthors() {
    return authors;
  }

  public void setAuthors(List<Author> authors) {
    this.authors = authors;
  }

  public Pagination getPagination() {
    return pagination;
  }

  public void setPagination(Pagination pagination) {
    this.pagination = pagination;
  }
}
