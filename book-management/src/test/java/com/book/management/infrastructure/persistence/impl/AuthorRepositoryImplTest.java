package com.book.management.infrastructure.persistence.impl;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.book.management.domain.model.Author;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class AuthorRepositoryImplTest {

  @InjectMocks
  private AuthorRepositoryImpl authorRepositoryImpl;

  @Mock
  private AuthorJpaRepository repository;

  @Test
  void shouldSaveAuthorWithSuccess() {
    when(repository.save(any())).thenReturn(new AuthorEntity(1L, "Teste"));

    var author = authorRepositoryImpl.save(new Author(1L, "Teste"));

    assertAll(
        () -> assertNotNull(author),
        () -> assertEquals(1L, author.getId()),
        () -> assertEquals("Teste", author.getName()),
        () -> verify(repository).save(any())
    );
  }

  @Test
  void shouldFindAuthorByIdWithSuccess() {
    when(repository.findById(any())).thenReturn(Optional.of(new AuthorEntity(1L, "Teste")));

    var author = authorRepositoryImpl.findById(1L);

    assertAll(
        () -> assertNotNull(author),
        () -> assertEquals(1L, author.getId()),
        () -> assertEquals("Teste", author.getName()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenNotFoundAuthorById() {
    when(repository.findById(any())).thenThrow(new IsNotFoundException("Author not found"));

    var exception = assertThrows(IsNotFoundException.class,
        () -> authorRepositoryImpl.findById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Author not found", exception.getMessage()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldFindAllAuthorWithSuccess() {
    when(repository.findAllAuthorOrByName(any())).thenReturn(List.of(new AuthorEntity(1L, "Teste")));

    var authors = authorRepositoryImpl.findAll("Teste");

    assertAll(
        () -> assertNotNull(authors),
        () -> assertEquals(1, authors.size()),
        () -> assertEquals(1L, authors.get(0).getId()),
        () -> assertEquals("Teste", authors.get(0).getName()),
        () -> verify(repository).findAllAuthorOrByName(any())
    );
  }

  @Test
  void shouldUpdateAuthorWithSuccess() {
    when(repository.findById(any())).thenReturn(Optional.of(new AuthorEntity(1L, "Teste")));
    when(repository.save(any())).thenReturn(new AuthorEntity(1L, "Teste"));

    var author = authorRepositoryImpl.update(new Author(1L, "Teste"));

    assertAll(
        () -> assertNotNull(author),
        () -> assertEquals(1L, author.getId()),
        () -> assertEquals("Teste", author.getName()),
        () -> verify(repository).findById(any()),
        () -> verify(repository).save(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenNotFoundAuthorToUpdate() {
    when(repository.findById(any())).thenThrow(new IsNotFoundException("Author not found"));

    var exception = assertThrows(IsNotFoundException.class,
        () -> authorRepositoryImpl.update(new Author(1L, "Teste"))
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Author not found", exception.getMessage()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldDeleteAuthorWithSuccess() {
    doNothing().when(repository).deleteById(any());

    authorRepositoryImpl.deleteById(1L);

    verify(repository).deleteById(any());
  }

  @Test
  void shouldReturnExceptionWhenNotFoundAuthorToDelete() {
    doThrow(new IsNotFoundException("Author not found")).when(repository).deleteById(any());

    var exception = assertThrows(IsNotFoundException.class,
        () -> authorRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Author not found", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenIntegrityViolationAuthorToDelete() {
    doThrow(new IsDataBaseException("Integrity violation")).when(repository).deleteById(any());

    var exception = assertThrows(IsDataBaseException.class,
        () -> authorRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Integrity violation", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }
}