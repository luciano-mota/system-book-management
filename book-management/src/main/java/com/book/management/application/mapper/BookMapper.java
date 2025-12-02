package com.book.management.application.mapper;

import com.book.management.application.controller.response.BookResponseDTO;
import com.book.management.domain.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.BookRequestDTO;

@Mapper
public interface BookMapper {

  BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

  Book toDomain(BookRequestDTO dto);

  @Mapping(source = "authorsIds", target = "authors")
  @Mapping(source = "subjectsIds", target = "subjects")
  BookResponseDTO toResponse(Book book);
}