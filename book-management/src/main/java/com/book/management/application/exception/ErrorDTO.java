package com.book.management.application.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorDTO {

  private String timestamp;
  private int status;
  private String error;
  private String message;
  private String path;
}
