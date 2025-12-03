package com.book.management.infrastructure.config;

import com.book.management.domain.repository.ReportRepository;
import com.book.management.domain.usecase.FindReportUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReportUseCaseConfig {

  @Bean
  public FindReportUseCase findReportUseCase(ReportRepository reportRepository) {
    return new FindReportUseCase(reportRepository);
  }
}