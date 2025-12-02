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

import com.book.management.domain.model.Subject;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class SubjectRepositoryJpaImplTest {

  @InjectMocks
  private SubjectRepositoryImpl subjectRepositoryImpl;

  @Mock
  private SubjectJpaRepository repository;

  @Test
  void shouldSaveSubjectWithSuccess() {
    when(repository.save(any())).thenReturn(new SubjectEntity(1L, "Teste"));

    var author = subjectRepositoryImpl.save(new Subject(1L, "Teste"));

    assertAll(
        () -> assertNotNull(author),
        () -> assertEquals(1L, author.getId()),
        () -> assertEquals("Teste", author.getDescription()),
        () -> verify(repository).save(any())
    );
  }

  @Test
  void shouldFindSubjectByIdWithSuccess() {
    when(repository.findById(any())).thenReturn(Optional.of(new SubjectEntity(1L, "Teste")));

    var author = subjectRepositoryImpl.findById(1L);

    assertAll(
        () -> assertNotNull(author),
        () -> assertEquals(1L, author.getId()),
        () -> assertEquals("Teste", author.getDescription()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenNotFoundSubjectById() {
    when(repository.findById(any())).thenThrow(new IsNotFoundException("Author not found"));

    var exception = assertThrows(IsNotFoundException.class,
        () -> subjectRepositoryImpl.findById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Author not found", exception.getMessage()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldFindAllSubjectWithSuccess() {
    when(repository.findAllSubjectEntityOrByDescription(any())).thenReturn(List.of(new SubjectEntity(1L, "Teste")));

    var authors = subjectRepositoryImpl.findAll("Teste");

    assertAll(
        () -> assertNotNull(authors),
        () -> assertEquals(1, authors.size()),
        () -> assertEquals(1L, authors.get(0).getId()),
        () -> assertEquals("Teste", authors.get(0).getDescription()),
        () -> verify(repository).findAllSubjectEntityOrByDescription(any())
    );
  }

  @Test
  void shouldUpdateSubjectWithSuccess() {
    when(repository.findById(any())).thenReturn(Optional.of(new SubjectEntity(1L, "Teste")));
    when(repository.save(any())).thenReturn(new SubjectEntity(1L, "Teste"));

    var subject = subjectRepositoryImpl.update(new Subject(1L, "Teste"));

    assertAll(
        () -> assertNotNull(subject),
        () -> assertEquals(1L, subject.getId()),
        () -> assertEquals("Teste", subject.getDescription()),
        () -> verify(repository).findById(any()),
        () -> verify(repository).save(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenNotFoundSubjectToUpdate() {
    when(repository.findById(any())).thenThrow(new IsNotFoundException("Subject not found"));

    var exception = assertThrows(IsNotFoundException.class,
        () -> subjectRepositoryImpl.update(new Subject(1L, "Teste"))
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Subject not found", exception.getMessage()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldDeleteSubjectWithSuccess() {
    doNothing().when(repository).deleteById(any());

    subjectRepositoryImpl.deleteById(1L);

    verify(repository).deleteById(any());
  }

  @Test
  void shouldReturnExceptionWhenNotFoundSubjectToDelete() {
    doThrow(new IsNotFoundException("Subject not found")).when(repository).deleteById(any());

    var exception = assertThrows(IsNotFoundException.class,
        () -> subjectRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Subject not found", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenIntegrityViolationSubjectToDelete() {
    doThrow(new IsDataBaseException("Integrity violation")).when(repository).deleteById(any());

    var exception = assertThrows(IsDataBaseException.class,
        () -> subjectRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Integrity violation", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }
}