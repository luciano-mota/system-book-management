package com.book.management.domain.model;

import java.math.BigDecimal;

public class Report {

  private Long bookCode;
  private String bookTitle;
  private String publisher;
  private String edition;
  private String yearPublication;
  private BigDecimal price;
  private String authors;
  private String subjects;

  public Report() {}

  public Long getBookCode() {
    return bookCode;
  }

  public void setBookCode(Long bookCode) {
    this.bookCode = bookCode;
  }

  public String getBookTitle() {
    return bookTitle;
  }

  public void setBookTitle(String bookTitle) {
    this.bookTitle = bookTitle;
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

  public String getAuthors() {
    return authors;
  }

  public void setAuthors(String authors) {
    this.authors = authors;
  }

  public String getSubjects() {
    return subjects;
  }

  public void setSubjects(String subjects) {
    this.subjects = subjects;
  }
}
