package com.book.management.application.controller;

import lombok.Data;

@Data
public class GenericRestReturnDTO<T> {

  private T data;

  public GenericRestReturnDTO() {}

  public GenericRestReturnDTO(T data) {
    this.data = data;
  }
}