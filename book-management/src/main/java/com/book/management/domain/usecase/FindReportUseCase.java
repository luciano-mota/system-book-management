package com.book.management.domain.usecase;

import com.book.management.domain.model.Report;
import com.book.management.domain.repository.ReportRepository;
import java.util.List;

public record FindReportUseCase(ReportRepository reportRepository) {

  public List<Report> find() {
    return reportRepository.find();
  }
}
