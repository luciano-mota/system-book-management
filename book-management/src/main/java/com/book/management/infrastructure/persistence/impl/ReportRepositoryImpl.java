package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Report;
import com.book.management.domain.repository.ReportRepository;
import com.book.management.infrastructure.persistence.mapper.ReportMapper;
import com.book.management.infrastructure.persistence.repository.ReportBookViewRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ReportRepositoryImpl implements ReportRepository {

  private final ReportBookViewRepository reportBookViewRepository;

  private final ReportMapper reportMapper;

  @Override
  @Transactional(readOnly = true)
  public List<Report> find() {
    return reportBookViewRepository.findAll().stream()
        .map(reportMapper::toModel)
        .toList();
  }
}
