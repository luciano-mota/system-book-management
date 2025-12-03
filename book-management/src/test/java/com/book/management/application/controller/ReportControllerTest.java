package com.book.management.application.controller;

import static com.book.management.domain.mock.ReportMock.buildReportMock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.book.management.application.mapper.ReportBookMapper;
import com.book.management.domain.usecase.FindReportUseCase;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = "spring.flyway.validate-on-migrate=false")
class ReportControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private FindReportUseCase findReportUseCase;

  @MockitoBean
  private ReportBookMapper reportBookMapper;

  @Test
  void shouldReturnReportWithSuccess() throws Exception {
    var report = List.of(buildReportMock());
    when(findReportUseCase.find()).thenReturn(report);

    mockMvc.perform(get("/api/v1/reports")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}