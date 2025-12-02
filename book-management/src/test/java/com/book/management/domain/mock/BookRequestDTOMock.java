package com.book.management.domain.mock;

import java.math.BigDecimal;
import java.util.List;
import org.openapitools.model.BookRequestDTO;

public final class BookRequestDTOMock {

  public static BookRequestDTO buildBookRequestMock() {
    var bookRequest = new BookRequestDTO();
    bookRequest.setBookCode(123L);
    bookRequest.setTitle("Title");
    bookRequest.setPublisher("Publisher");
    bookRequest.setEdition("edition");
    bookRequest.setYearPublication("2023");
    bookRequest.setPrice(BigDecimal.valueOf(25.00));
    bookRequest.setAuthorsIds(List.of(1));
    bookRequest.setSubjectsIds(List.of(1));

    return bookRequest;
  }
}
