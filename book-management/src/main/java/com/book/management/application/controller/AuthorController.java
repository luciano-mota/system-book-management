package com.book.management.application.controller;

import static org.springframework.http.HttpStatus.CREATED;

import com.book.management.application.mapper.AuthorMapper;
import com.book.management.domain.usecase.InsertAuthorUseCase;
import com.book.management.domain.usecase.DeleteAuthorUseCase;
import com.book.management.domain.usecase.FindAllAuthorUseCase;
import com.book.management.domain.usecase.FindAuthorByIdUseCase;
import com.book.management.domain.usecase.UpdateAuthorUseCase;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.AuthorsApi;
import org.openapitools.model.AuthorRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthorController implements AuthorsApi {

  private final InsertAuthorUseCase insertAuthorUseCase;
  private final FindAuthorByIdUseCase findAuthorByIdUseCase;
  private final FindAllAuthorUseCase findAllAuthorUseCase;
  private final UpdateAuthorUseCase updateAuthorUseCase;
  private final DeleteAuthorUseCase deleteAuthorUseCase;

  private final AuthorMapper authorMapper;

  @Override
  public ResponseEntity<GenericRestReturnDTO> createAuthor(HttpServletRequest httpServletRequest, AuthorRequestDTO authorRequestDTO) {
    var author = authorMapper.toDomain(authorRequestDTO);
    var savedAuthor = insertAuthorUseCase.create(author);

    return ResponseEntity.status(CREATED)
        .body(new GenericRestReturnDTO(authorMapper.toResponse(savedAuthor)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getAuthorById(HttpServletRequest httpServletRequest, Long id) {
    var author = findAuthorByIdUseCase.find(id);

    return ResponseEntity.ok(new GenericRestReturnDTO(author));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getAllAuthors(HttpServletRequest httpServletRequest) {
    var authors = findAllAuthorUseCase.find().stream()
        .map(authorMapper::toResponse)
        .toList();

    return ResponseEntity.ok(new GenericRestReturnDTO(authors));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> updateAuthor(HttpServletRequest httpServletRequest, Long id, AuthorRequestDTO authorRequestDTO) {
    var author = authorMapper.toDomain(authorRequestDTO);
    author.setId(id);
    var updatedAuthor = updateAuthorUseCase.update(author);

    return ResponseEntity.ok(new GenericRestReturnDTO(authorMapper.toResponse(updatedAuthor)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> deleteAuthor(HttpServletRequest httpServletRequest, Long id) {
    deleteAuthorUseCase.delete(id);
    return ResponseEntity.noContent().build();
  }
}