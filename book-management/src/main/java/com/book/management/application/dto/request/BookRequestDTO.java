package com.book.management.application.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record BookRequestDTO(
    String title,
    LocalDate publishedDate,
    BigDecimal value,
    List<Long> authorsIds,
    List<Long> subjectsIds
) {}