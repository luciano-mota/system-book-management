package com.book.management.infrastructure.persistence.impl;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

import com.book.management.domain.model.Book;
import com.book.management.domain.repository.BookRepository;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.entity.BookEntity;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import com.book.management.infrastructure.persistence.repository.BookJpaRepository;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepository {

  private final BookJpaRepository bookJpaRepository;
  private final AuthorJpaRepository authorJpaRepository;
  private final SubjectJpaRepository subjectJpaRepository;


  @Override
  public Book save(Book book) {
    var bookEntity = toEntity(book);
    var savedEntity = bookJpaRepository.save(bookEntity);
    return toModel(savedEntity);
  }

  @Override
  public Optional<Book> findById(Long id) {
    return bookJpaRepository.findById(id).map(this::toModel);
  }

  @Override
  public List<Book> findAll() {
    return bookJpaRepository.findAll().stream()
        .map(this::toModel)
        .toList();
  }

  @Override
  public void deleteById(Long id) {
    bookJpaRepository.deleteById(id);
  }

  @Override
  public boolean existsById(Long id) {
    return bookJpaRepository.existsById(id);
  }

  private BookEntity toEntity(Book book) {
    var bookEntity = BookEntity.builder()
        .id(book.getId())
        .title(book.getTitle())
        .publicationDate(book.getPublicationDate())
        .value(book.getValue())
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
    var authorsIds = isNull(bookEntity.getAuthors()) ? null :
        bookEntity.getAuthors().stream()
            .map(AuthorEntity::getId)
            .toList();

    var subjectsIds = isNull(bookEntity.getSubjects()) ? null :
        bookEntity.getSubjects().stream()
            .map(SubjectEntity::getId)
            .toList();

    return new Book(
        bookEntity.getId(),
        bookEntity.getTitle(),
        bookEntity.getPublicationDate(),
        bookEntity.getValue(),
        authorsIds,
        subjectsIds
    );
  }
}