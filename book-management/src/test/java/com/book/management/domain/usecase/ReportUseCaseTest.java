package com.book.management.domain.usecase;

import static com.book.management.domain.mock.ReportMock.buildReportMock;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import com.book.management.domain.repository.ReportRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ReportUseCaseTest {

  @InjectMocks
  private FindReportUseCase findReportUseCase;

  @Mock
  private ReportRepository reportRepository;

  @Test
  void shouldReturnReportWIthSuccess() {
    when(reportRepository.find()).thenReturn(List.of(buildReportMock()));

    var reports = findReportUseCase.find();

    assertAll(
        () -> assertNotNull(reports),
        () -> assertEquals(1, reports.size())
    );
  }
}
