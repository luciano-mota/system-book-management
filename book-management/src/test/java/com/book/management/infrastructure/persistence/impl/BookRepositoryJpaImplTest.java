package com.book.management.infrastructure.persistence.impl;

import static com.book.management.infrastructure.persistence.mock.BookEntityMock.buildBookEntityMock;
import static com.book.management.domain.mock.BookMock.buildBookMock;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import com.book.management.infrastructure.persistence.repository.BookJpaRepository;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class BookRepositoryJpaImplTest {

  @InjectMocks
  private BookRepositoryImpl bookRepositoryImpl;

  @Mock
  private BookJpaRepository repository;

  @Mock
  private AuthorJpaRepository authorJpaRepository;

  @Mock
  private SubjectJpaRepository subjectJpaRepository;

  @Test
  void shouldSaveBookWithSuccess() {
    when(authorJpaRepository.getReferenceById(any())).thenReturn(new AuthorEntity(1L, "Author Test"));
    when(subjectJpaRepository.getReferenceById(any())).thenReturn(new SubjectEntity(1L, "Subject Test"));
    when(repository.save(any())).thenReturn(buildBookEntityMock());

    var book = bookRepositoryImpl.save(buildBookMock());

    assertAll(
        () -> assertNotNull(book),
        () -> assertEquals(1L, book.getId()),
        () -> assertEquals("Title Test", book.getTitle()),
        () -> assertEquals("Publisher Test", book.getPublisher()),
        () -> assertEquals("2023", book.getYearPublication()),
        () -> verify(authorJpaRepository).getReferenceById(any()),
        () -> verify(subjectJpaRepository).getReferenceById(any()),
        () -> verify(repository, times(2)).save(any())
    );
  }

  @Test
  void shouldReturnBookWithSuccess() {
    when(repository.findById(any())).thenReturn(Optional.of(buildBookEntityMock()));

    var book = bookRepositoryImpl.findById(1L);

    assertAll(
        () -> assertNotNull(book),
        () -> assertEquals(1L, book.getId()),
        () -> assertEquals("Title Test", book.getTitle()),
        () -> assertEquals("Publisher Test", book.getPublisher()),
        () -> assertEquals("2023", book.getYearPublication()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenNotFoundBookById() {
    when(repository.findById(any())).thenThrow(new IsNotFoundException("Book not found"));

    var exception = assertThrows(IsNotFoundException.class,
        () -> bookRepositoryImpl.findById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Book not found", exception.getMessage()),
        () -> verify(repository).findById(any())
    );
  }

  @Test
  void shouldReturnAllBooksWithSuccess() {
    when(repository.findAllBooksOrByName(any())).thenReturn(List.of(buildBookEntityMock()));

    var books = bookRepositoryImpl.findAll("Title Test");

    assertAll(
        () -> assertNotNull(books),
        () -> assertEquals(1, books.size()),
        () -> assertEquals(1L, books.get(0).getId()),
        () -> assertEquals("Title Test", books.get(0).getTitle()),
        () -> verify(repository).findAllBooksOrByName(any())
    );
  }

  @Test
  void shouldUpdateBookWithSuccess() {
    when(authorJpaRepository.getReferenceById(any())).thenReturn(new AuthorEntity(1L, "Author Test"));
    when(subjectJpaRepository.getReferenceById(any())).thenReturn(new SubjectEntity(1L, "Subject Test"));
    when(repository.findById(any())).thenReturn(Optional.of(buildBookEntityMock()));
    when(repository.save(any())).thenReturn(buildBookEntityMock());

    var book = bookRepositoryImpl.update(buildBookMock());

    assertAll(
        () -> assertNotNull(book),
        () -> assertEquals(1L, book.getId()),
        () -> assertEquals("Title", book.getTitle()),
        () -> assertEquals("Publisher", book.getPublisher()),
        () -> assertEquals("2023", book.getYearPublication()),
        () -> verify(authorJpaRepository).getReferenceById(any()),
        () -> verify(subjectJpaRepository).getReferenceById(any()),
        () -> verify(repository).findById(any()),
        () -> verify(repository, times(1)).save(any())
    );
  }

  @Test
  void shouldDeleteBookWithSuccess() {
    doNothing().when(repository).deleteById(any());

    bookRepositoryImpl.deleteById(1L);

    verify(repository).deleteById(any());
  }

  @Test
  void shouldReturnExceptionWhenNotFoundBookToDelete() {
    doThrow(new IsNotFoundException("Subject not found")).when(repository).deleteById(any());

    var exception = assertThrows(IsNotFoundException.class,
        () -> bookRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Subject not found", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }

  @Test
  void shouldReturnExceptionWhenIntegrityViolationBookToDelete() {
    doThrow(new IsDataBaseException("Integrity violation")).when(repository).deleteById(any());

    var exception = assertThrows(IsDataBaseException.class,
        () -> bookRepositoryImpl.deleteById(1L)
    );

    assertAll(
        () -> assertNotNull(exception),
        () -> assertEquals("Integrity violation", exception.getMessage()),
        () -> verify(repository).deleteById(any())
    );
  }
}