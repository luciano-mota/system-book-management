package com.book.management.application.mapper;

import com.book.management.application.controller.response.ReportResponseDTO;
import com.book.management.domain.model.Report;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReportBookMapper {

  ReportBookMapper INSTANCE = Mappers.getMapper(ReportBookMapper.class);

  List<ReportResponseDTO> toResponse(List<Report> report);
}