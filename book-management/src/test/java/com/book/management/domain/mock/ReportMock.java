package com.book.management.domain.mock;

import com.book.management.domain.model.Report;
import java.math.BigDecimal;

public final class ReportMock {

  public static Report buildReportMock() {
    return new Report(
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
