package com.book.management.domain.model;

public class Pagination {

  private Integer totalPages;
  private Long totalElements;
  private Integer page;
  private Integer size;

  public Pagination(Integer totalPages, Long totalElements, Integer page, Integer size) {
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.page = page;
    this.size = size;
  }

  public Integer getTotalPages() {
    return totalPages;
  }

  public void setTotalPages(Integer totalPages) {
    this.totalPages = totalPages;
  }

  public Long getTotalElements() {
    return totalElements;
  }

  public void setTotalElements(Long totalElements) {
    this.totalElements = totalElements;
  }

  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

}