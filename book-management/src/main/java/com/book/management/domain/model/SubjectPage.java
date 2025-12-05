package com.book.management.domain.model;

import java.util.List;

public class SubjectPage {

  private List<Subject> subjects;
  private Pagination pagination;

  public SubjectPage(List<Subject> subjects, Pagination pagination) {
    this.subjects = subjects;
    this.pagination = pagination;
  }

  public List<Subject> getSubjects() {
    return subjects;
  }

  public void setSubjects(List<Subject> subjects) {
    this.subjects = subjects;
  }

  public Pagination getPagination() {
    return pagination;
  }

  public void setPagination(Pagination pagination) {
    this.pagination = pagination;
  }
}
