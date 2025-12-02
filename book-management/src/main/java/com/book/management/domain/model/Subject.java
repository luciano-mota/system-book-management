package com.book.management.domain.model;

public class Subject {

  private Long id;
  private String description;

  public Subject() {}

  public Subject(Long id, String description) {
    this.id = id;
    this.description = description;
  }

  public static Subject newSubject(String description) {
    return new Subject(null, description);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
