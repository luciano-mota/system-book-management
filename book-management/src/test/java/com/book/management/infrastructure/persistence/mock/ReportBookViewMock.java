package com.book.management.infrastructure.persistence.mock;

import com.book.management.infrastructure.persistence.view.ReportBookView;
import java.math.BigDecimal;

public final class ReportBookViewMock {

  public static ReportBookView buildReportViewMock() {
    return new ReportBookView(
        123L,
        "test",
        "test",
        "test",
        "test",
        BigDecimal.valueOf(10.0),
        "test",
        "test"
    );
  }
}