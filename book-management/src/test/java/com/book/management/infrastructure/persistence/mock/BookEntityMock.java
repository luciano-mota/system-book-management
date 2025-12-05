package com.book.management.infrastructure.persistence.mock;

import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.entity.BookEntity;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import java.math.BigDecimal;
import java.util.Set;

public final class BookEntityMock {

  public static BookEntity buildBookEntityMock() {
    return new BookEntity(
        1L,
        123L,
        "Title Test",
        "Publisher Test",
        "edition",
        "2023",
        BigDecimal.valueOf(10.0),
        Set.of(new AuthorEntity(1L, "Author Test")),
       Set.of(new SubjectEntity(1L, "Subject Test"))
    );
  }
}
