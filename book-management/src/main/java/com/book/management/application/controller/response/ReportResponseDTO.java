package com.book.management.application.controller.response;

import java.math.BigDecimal;

public record ReportResponseDTO(
    Long bookCode,
    String bookTitle,
    String publisher,
    String edition,
    String yearPublication,
    BigDecimal price,
    String authors,
    String subjects
) {}
