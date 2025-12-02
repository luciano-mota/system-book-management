package com.book.management.domain.usecase;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AuthorUseCasesTest {

  @InjectMocks
  private FindAuthorByIdUseCase findAuthorByIdUseCase;

  @InjectMocks
  private FindAllAuthorUseCase findAllAuthorUseCase;

  @InjectMocks
  private InsertAuthorUseCase insertAuthorUseCase;

  @InjectMocks
  private UpdateAuthorUseCase updateAuthorUseCase;

  @InjectMocks
  private DeleteAuthorUseCase deleteAuthorUseCase;

  @Mock
  private AuthorRepository authorRepository;

  @Test
  void shouldInsertAuthorWithSuccess() {
    var author = new Author(1L, "Teste");
    when(authorRepository.save(any())).thenReturn(author);

    var authorResult = insertAuthorUseCase.create(author);

    assertAll(
        () -> assertNotNull(authorResult),
        () -> assertEquals(author.getId(), authorResult.getId()),
        () -> assertEquals(author.getName(), authorResult.getName()),
        () -> verify(authorRepository).save(any())
    );
  }

  @Test
  void shouldFindAuthorByIdWithSuccess() {
    var author = new Author(1L, "Teste");
    when(authorRepository.findById(any())).thenReturn(author);

    var authorResult = findAuthorByIdUseCase.find(1L);

    assertAll(
        () -> assertNotNull(authorResult),
        () -> assertEquals(1L, authorResult.getId()),
        () -> assertEquals("Teste", authorResult.getName())
    );
  }

  @Test
  void shouldFindAllAuthorWithSuccess() {
    when(authorRepository.findAll(any())).thenReturn(List.of(new Author(1L, "Teste")));

    var authors = findAllAuthorUseCase.find("Teste");

    assertAll(
        () -> assertNotNull(authors),
        () -> assertEquals(1, authors.size()),
        () -> assertEquals(1L, authors.get(0).getId()),
        () -> assertEquals("Teste", authors.get(0).getName())
    );
  }

  @Test
  void shouldUpdateAuthorWithSuccess() {
    var author = new Author(1L, "Teste");
    when(authorRepository.update(any())).thenReturn(author);

    var authorResult = updateAuthorUseCase.update(author);

    assertAll(
        () -> assertNotNull(authorResult),
        () -> assertEquals(author.getId(), authorResult.getId()),
        () -> assertEquals(author.getName(), authorResult.getName()),
        () -> verify(authorRepository).update(any())
    );
  }

  @Test
  void shouldDeleteAuthorWithSuccess() {
    doNothing().when(authorRepository).deleteById(any());

    deleteAuthorUseCase.delete(1L);

    verify(authorRepository).deleteById(any());
  }
}