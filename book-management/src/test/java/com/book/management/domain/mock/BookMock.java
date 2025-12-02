package com.book.management.domain.mock;

import com.book.management.domain.model.Book;
import java.math.BigDecimal;
import java.util.List;

public final class BookMock {

  public static Book buildBookMock() {
    return Book.newBook(
        123,
        "Title",
        "Publisher",
        "1st Edition",
        "2023",
        BigDecimal.valueOf(25.00),
        List.of(1L),
        List.of(1L)
    );
  }
}
