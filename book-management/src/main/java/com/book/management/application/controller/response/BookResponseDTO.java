package com.book.management.application.controller.response;

import java.util.List;

public record BookResponseDTO(
    Long id,
    Integer bookCode,
    String title,
    String publisher,
    String edition,
    String publishedDate,
    String price,
    List<Long> authors,
    List<Long> subjects
) {}