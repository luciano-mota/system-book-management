package com.book.management.application.handler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GeneralExceptionHandler {

  @ExceptionHandler(IsNotFoundException.class)
  public ResponseEntity<ErrorDTO> handleNotFoundException(IsNotFoundException ex,
      HttpServletRequest request) {

    return ResponseEntity.status(NOT_FOUND)
        .body(
            ErrorDTO.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(404)
                .error(NOT_FOUND.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build()
        );
  }

  @ExceptionHandler(IsDataBaseException.class)
  public ResponseEntity<ErrorDTO> handleDataBaseException(IsDataBaseException ex,
      HttpServletRequest request) {
    return ResponseEntity.status(400)
        .body(ErrorDTO.builder()
            .timestamp(LocalDateTime.now().toString())
            .status(400)
            .error(BAD_REQUEST.name())
            .message(ex.getMessage())
            .path(request.getRequestURI())
            .build());
  }


  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDTO> handleGenericException(Exception ex,
      HttpServletRequest request) {
    return ResponseEntity.status(500)
        .body(
            ErrorDTO.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(500)
                .error(INTERNAL_SERVER_ERROR.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build()
        );
  }
}
