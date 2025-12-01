package com.book.management.application.mapper;

import com.book.management.application.controller.response.SubjectResponseDTO;
import com.book.management.domain.model.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.SubjectRequestDTO;

@Mapper
public interface SubjectMapper {

  SubjectMapper INSTANCE = Mappers.getMapper(SubjectMapper.class);

  Subject toDomain(SubjectRequestDTO subjectRequestDTO);

  SubjectResponseDTO toResponse(Subject subject);
}
