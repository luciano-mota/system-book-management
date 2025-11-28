package com.book.management.domain.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class Book {

  private Long id;
  private String title;
  private LocalDate publicationDate;
  private BigDecimal value;
  private List<Long> authorsIds;
  private List<Long> subjectsIds;

  public Book() {

  }

  public Book(Long id, String title, LocalDate publicationDate, BigDecimal value,
      List<Long> authorsIds, List<Long> subjectsIds) {
    this.id = id;
    this.title = title;
    this.publicationDate = publicationDate;
    this.value = value;
    this.authorsIds = authorsIds;
    this.subjectsIds = subjectsIds;
  }

  public static Book newBook(String title, LocalDate publicationDate, BigDecimal value,
      List<Long> authorsIds, List<Long> mattersIds) {
    return new Book(null, title, publicationDate, value, authorsIds, mattersIds);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public LocalDate getPublicationDate() {
    return publicationDate;
  }

  public void setPublicationDate(LocalDate publicationDate) {
    this.publicationDate = publicationDate;
  }

  public BigDecimal getValue() {
    return value;
  }

  public void setValue(BigDecimal value) {
    this.value = value;
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
