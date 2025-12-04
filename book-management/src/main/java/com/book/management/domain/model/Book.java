package com.book.management.domain.model;

import java.math.BigDecimal;
import java.util.List;

public class Book {

  private Long id;
  private Long bookCode;
  private String title;
  private String publisher;
  private String edition;
  private String yearPublication;
  private BigDecimal price;
  private List<Long> authorsIds;
  private List<Long> subjectsIds;

  public Book() {}

  public Book(Long id, Long bookCode, String title, String publisher, String edition, String yearPublication, BigDecimal price,
      List<Long> authorsIds, List<Long> subjectsIds) {
    this.id = id;
    this.bookCode = bookCode;
    this.title = title;
    this.publisher = publisher;
    this.edition = edition;
    this.yearPublication = yearPublication;
    this.price = price;
    this.authorsIds = authorsIds;
    this.subjectsIds = subjectsIds;
  }

  public static Book newBook(Long bookCode, String title, String publisher, String edition, String yearPublication, BigDecimal price,
      List<Long> authorsIds, List<Long> subjectsIds) {
    return new Book(null, bookCode, title, publisher, edition, yearPublication, price, authorsIds, subjectsIds);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getBookCode() {
    return bookCode;
  }

  public void setBookCode(Long bookCode) {
    this.bookCode = bookCode;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getPublisher() {
    return publisher;
  }

  public void setPublisher(String publisher) {
    this.publisher = publisher;
  }

  public String getEdition() {
    return edition;
  }

  public void setEdition(String edition) {
    this.edition = edition;
  }

  public String getYearPublication() {
    return yearPublication;
  }

  public void setYearPublication(String yearPublication) {
    this.yearPublication = yearPublication;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public List<Long> getAuthorsIds() {
    return authorsIds;
  }

  public void setAuthorsIds(List<Long> authorsIds) {
    this.authorsIds = authorsIds;
  }

  public List<Long> getSubjectsIds() {
    return subjectsIds;
  }

  public void setSubjectsIds(List<Long> subjectsIds) {
    this.subjectsIds = subjectsIds;
  }
}
