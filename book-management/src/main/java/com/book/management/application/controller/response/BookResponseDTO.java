package com.book.management.application.controller.response;

import java.util.List;

public record BookResponseDTO(
    Long id,
    Long bookCode,
    String title,
    String publisher,
    String edition,
    String yearPublication,
    String price,
    List<Long> authors,
    List<Long> subjects
) {}