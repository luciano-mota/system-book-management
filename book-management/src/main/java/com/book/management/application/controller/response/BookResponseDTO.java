package com.book.management.application.controller.response;

import java.util.List;

public record BookResponseDTO(
    Long id,
    String title,
    String publishedDate,
    String value,
    List<Long> authors,
    List<Long> subjects
) {}