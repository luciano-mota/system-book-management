package com.book.management.infrastructure.persistence.mapper;

import com.book.management.domain.model.Report;
import com.book.management.infrastructure.persistence.view.ReportBookView;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReportMapper {

  ReportMapper INSTANCE = Mappers.getMapper(ReportMapper.class);

  Report toModel(ReportBookView reportBookView);
}
