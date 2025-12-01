package com.book.management.domain.model;

import java.math.BigDecimal;
import java.util.List;

public class Book {

  private Long id;
  private Integer bookCode;
  private String title;
  private String publisher;
  private String edition;
  private String publicationDate;
  private BigDecimal price;
  private List<Long> authorsIds;
  private List<Long> subjectsIds;

  public Book() {}

  public Book(Long id, Integer bookCode, String title, String publisher, String edition, String publicationDate, BigDecimal price,
      List<Long> authorsIds, List<Long> subjectsIds) {
    this.id = id;
    this.bookCode = bookCode;
    this.title = title;
    this.publisher = publisher;
    this.edition = edition;
    this.publicationDate = publicationDate;
    this.price = price;
    this.authorsIds = authorsIds;
    this.subjectsIds = subjectsIds;
  }

  public static Book newBook(Integer bookCode, String title, String publisher, String edition, String publicationDate, BigDecimal price,
      List<Long> authorsIds, List<Long> subjectsIds) {
    return new Book(null, bookCode, title, publisher, edition, publicationDate, price, authorsIds, subjectsIds);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getBookCode() {
    return bookCode;
  }

  public void setBookCode(Integer bookCode) {
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

  public String getPublicationDate() {
    return publicationDate;
  }

  public void setPublicationDate(String publicationDate) {
    this.publicationDate = publicationDate;
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
