package com.book.management.domain.usecase;

import static com.book.management.domain.mock.BookMock.buildBookMock;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.book.management.domain.model.BookPage;
import com.book.management.domain.model.Pagination;
import com.book.management.domain.repository.AuthorRepository;
import com.book.management.domain.repository.BookRepository;
import com.book.management.domain.repository.SubjectRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BookUseCasesTest {

  @InjectMocks
  private InsertBookUseCase insertBookUseCase;

  @InjectMocks
  private FindBookByIdUseCase findBookByIdUseCase;

  @InjectMocks
  private FindAllBookUseCase findAllBookUseCase;

  @InjectMocks
  private UpdateBookUseCase updateBookUseCase;

  @InjectMocks
  private DeleteBookUseCase deleteBookUseCase;

  @Mock
  private BookRepository bookRepository;

  @Mock
  private AuthorRepository authorRepository;

  @Mock
  private SubjectRepository subjectRepository;

  @Test
  void shouldInsertBookWithSuccess() {
    var book = buildBookMock();

    when(bookRepository.save(any())).thenReturn(book);

    var bookResult = insertBookUseCase.insert(book);

    assertAll(
        () -> assertNotNull(bookResult),
        () -> assertEquals(book.getBookCode(), bookResult.getBookCode()),
        () -> assertEquals(book.getTitle(), bookResult.getTitle()),
        () -> assertEquals(book.getPublisher(), bookResult.getPublisher()),
        () -> assertEquals(book.getEdition(), bookResult.getEdition()),
        () -> assertEquals(book.getYearPublication(), bookResult.getYearPublication()),
        () -> assertEquals(book.getPrice(), bookResult.getPrice()),
        () -> assertEquals(book.getAuthorsIds(), bookResult.getAuthorsIds()),
        () -> assertEquals(book.getSubjectsIds(), bookResult.getSubjectsIds()),
        () -> verify(bookRepository).save(any())
    );
  }

  @Test
  void shouldFindBookByIdWithSuccess() {
    var book = buildBookMock();

    when(bookRepository.findById(any())).thenReturn(buildBookMock());

    var bookResult = findBookByIdUseCase.find(1L);

    assertAll(
        () -> assertNotNull(bookResult),
        () -> assertEquals(book.getBookCode(), bookResult.getBookCode()),
        () -> assertEquals(book.getTitle(), bookResult.getTitle()),
        () -> assertEquals(book.getPublisher(), bookResult.getPublisher()),
        () -> assertEquals(book.getEdition(), bookResult.getEdition()),
        () -> assertEquals(book.getYearPublication(), bookResult.getYearPublication()),
        () -> assertEquals(book.getPrice(), bookResult.getPrice()),
        () -> assertEquals(book.getAuthorsIds(), bookResult.getAuthorsIds()),
        () -> assertEquals(book.getSubjectsIds(), bookResult.getSubjectsIds()),
        () -> verify(bookRepository).findById(any())
    );
  }

  @Test
  void shouldFindAllBookWithSuccess() {
    when(bookRepository.findAll(any(), any(), any()))
        .thenReturn(new BookPage(List.of(buildBookMock()), new Pagination(1, 1L, 1, 1)));

    var books = findAllBookUseCase.find(1, 1, "Title");

    assertAll(
        () -> assertNotNull(books),
        () -> assertEquals(1, books.getBooks().size()),
        () -> assertEquals(buildBookMock().getBookCode(), books.getBooks().get(0).getBookCode()),
        () -> assertEquals(buildBookMock().getTitle(), books.getBooks().get(0).getTitle()),
        () -> assertEquals(buildBookMock().getPublisher(), books.getBooks().get(0).getPublisher()),
        () -> assertEquals(buildBookMock().getEdition(), books.getBooks().get(0).getEdition()),
        () -> assertEquals(buildBookMock().getYearPublication(), books.getBooks().get(0).getYearPublication()),
        () -> assertEquals(buildBookMock().getPrice(), books.getBooks().get(0).getPrice()),
        () -> assertEquals(buildBookMock().getAuthorsIds(), books.getBooks().get(0).getAuthorsIds()),
        () -> assertEquals(buildBookMock().getSubjectsIds(), books.getBooks().get(0).getSubjectsIds()),
        () -> verify(bookRepository).findAll(any(), any(), any())
    );
  }

  @Test
  void shouldUpdateBookWithSuccess() {
    var book = buildBookMock();

    when(bookRepository.update(any())).thenReturn(book);

    var bookResult = updateBookUseCase.update(book);

    assertAll(
        () -> assertNotNull(bookResult),
        () -> assertEquals(book.getBookCode(), bookResult.getBookCode()),
        () -> assertEquals(book.getTitle(), bookResult.getTitle()),
        () -> assertEquals(book.getPublisher(), bookResult.getPublisher()),
        () -> assertEquals(book.getEdition(), bookResult.getEdition()),
        () -> assertEquals(book.getYearPublication(), bookResult.getYearPublication()),
        () -> assertEquals(book.getPrice(), bookResult.getPrice()),
        () -> assertEquals(book.getAuthorsIds(), bookResult.getAuthorsIds()),
        () -> assertEquals(book.getSubjectsIds(), bookResult.getSubjectsIds()),
        () -> verify(bookRepository).update(any())
    );
  }

  @Test
  void shouldDeleteWithSuccess() {
    doNothing().when(bookRepository).deleteById(any());

    deleteBookUseCase.delete(1L);

    verify(bookRepository).deleteById(any());
  }
}