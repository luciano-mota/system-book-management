package com.book.management.application.mapper;

import com.book.management.application.dto.request.BookRequestDTO;
import com.book.management.application.dto.response.BookResponseDTO;
import com.book.management.domain.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookMapper {

  BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

  Book toDomain(BookRequestDTO dto);

  BookResponseDTO toResponse(Book book);
}