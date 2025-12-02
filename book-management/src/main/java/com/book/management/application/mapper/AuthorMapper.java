package com.book.management.application.mapper;

import com.book.management.application.controller.response.AuthorResponseDTO;
import com.book.management.domain.model.Author;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AuthorRequestDTO;

@Mapper
public interface AuthorMapper {

  AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

  @Mapping(target = "id", ignore = true)
  Author toDomain(AuthorRequestDTO dto);

  AuthorResponseDTO toResponse(Author author);
}