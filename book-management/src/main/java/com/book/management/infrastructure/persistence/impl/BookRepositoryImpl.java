package com.book.management.infrastructure.persistence.impl;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.entity.BookEntity;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import com.book.management.infrastructure.persistence.repository.BookJpaRepository;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepository {

  private final BookJpaRepository bookJpaRepository;
  private final AuthorJpaRepository authorJpaRepository;
  private final SubjectJpaRepository subjectJpaRepository;


  @Override
  @Transactional
  public Book save(Book book) {
    var bookEntity = toEntity(book);
    var savedEntity = bookJpaRepository.save(bookEntity);
    return toModel(savedEntity);
  }

  @Override
  @Transactional(readOnly = true)
  public Book findById(Long id) {
    var bookEntity = bookJpaRepository.findById(id)
        .orElseThrow(() -> new IsNotFoundException("Book not found with id: " + id));
    return toModel(bookEntity);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Book> findAll() {
    return bookJpaRepository.findAll().stream()
        .map(this::toModel)
        .toList();
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    try {
      bookJpaRepository.deleteById(id);
    } catch (EmptyResultDataAccessException e) {
      throw new IsNotFoundException("Book not found with id: " + id);
    } catch (DataIntegrityViolationException e) {
      throw new IsDataBaseException("Integrity violation");
    }
  }

  @Override
  @Transactional
  public Book update(Book book) {
    var bookEntity = bookJpaRepository.findById(book.getId())
        .orElseThrow(() -> new IsNotFoundException("Book not found with id: " + book.getId()));
    bookEntity = toEntity(book);
    bookJpaRepository.save(bookEntity);
    return toModel(bookEntity);
  }

  private BookEntity toEntity(Book book) {
    var bookEntity = BookEntity.builder()
        .id(isNull(book.getId()) ? null : book.getId())
        .bookCode(book.getBookCode())
        .title(book.getTitle())
        .publisher(book.getPublisher())
        .edition(book.getEdition())
        .publicationDate(book.getYearPublication())
        .price(book.getPrice())
        .build();

    if (nonNull(book.getAuthorsIds())){
      Set<AuthorEntity> authors = book.getAuthorsIds().stream()
          .map(authorJpaRepository::getReferenceById)
          .collect(Collectors.toSet());
      bookEntity.setAuthors(authors);
    }

    if (nonNull(book.getSubjectsIds())) {
      Set<SubjectEntity> subjects = book.getSubjectsIds().stream()
          .map(subjectJpaRepository::getReferenceById)
          .collect(Collectors.toSet());
      bookEntity.setSubjects(subjects);
    }
    return bookEntity;
  }

  public Book toModel(BookEntity bookEntity) {
    List<Long> authorsIds = null;
    if (nonNull(bookEntity.getAuthors())) {
      authorsIds = bookEntity.getAuthors().stream()
          .map(AuthorEntity::getId)
          .toList();
    }

    List<Long> subjectsIds = null;
    if (nonNull(bookEntity.getSubjects())) {
      subjectsIds = bookEntity.getSubjects().stream()
          .map(SubjectEntity::getId)
          .toList();
    }

    return new Book(
        bookEntity.getId(),
        bookEntity.getBookCode(),
        bookEntity.getTitle(),
        bookEntity.getPublisher(),
        bookEntity.getEdition(),
        bookEntity.getPublicationDate(),
        bookEntity.getPrice(),
        authorsIds,
        subjectsIds
    );
  }
}