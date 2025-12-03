package com.book.management.infrastructure.persistence.impl;

import static com.book.management.infrastructure.persistence.mock.ReportBookViewMock.buildReportViewMock;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import com.book.management.infrastructure.persistence.mapper.ReportMapper;
import com.book.management.infrastructure.persistence.repository.ReportBookViewRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class ReportRepositoryImplTest {

  @InjectMocks
  private ReportRepositoryImpl reportRepositoryImpl;

  @Mock
  private ReportBookViewRepository repository;

  @Mock
  private ReportMapper reportMapper;

  @Test
  void shouldReturnDataViewWithSuccess() {
    when(repository.findAll()).thenReturn(List.of(buildReportViewMock()));

    var reports = reportRepositoryImpl.find();

    assertAll(
        () -> assertNotNull(reports),
        () -> assertEquals(1, reports.size())
    );

  }
}