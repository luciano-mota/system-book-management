package com.book.management.application.controller;

import com.book.management.application.controller.response.GenericRestReturnDTO;
import com.book.management.application.mapper.ReportBookMapper;
import com.book.management.domain.usecase.FindReportUseCase;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.ReportApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReportController implements ReportApi {

  private final FindReportUseCase findReportUseCase;

  private final ReportBookMapper reportBookMapper;

  @Override
  public ResponseEntity<GenericRestReturnDTO> getBookReport(HttpServletRequest httpServletRequest) {
    return ResponseEntity.ok(new GenericRestReturnDTO(reportBookMapper.toResponse(findReportUseCase.find())));
  }
}
