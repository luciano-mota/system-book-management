package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Author;
import com.book.management.domain.model.AuthorPage;
import com.book.management.domain.model.Pagination;
import com.book.management.domain.repository.AuthorRepository;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class AuthorRepositoryImpl implements AuthorRepository {

  private final AuthorJpaRepository authorJpaRepository;

  @Override
  @Transactional
  public Author save(Author author) {
    var authorEntity = authorJpaRepository.save(new AuthorEntity(author.getName()));
    return new Author(authorEntity.getId(), authorEntity.getName());
  }

  @Override
  @Transactional(readOnly = true)
  public Author findById(Long id) {
    var authorEntity = authorJpaRepository.findById(id)
        .orElseThrow(() -> new IsNotFoundException("Author not found with id: " + id));
    return new Author(authorEntity.getId(), authorEntity.getName());
  }

  @Override
  @Transactional(readOnly = true)
  public AuthorPage findAll(Integer page, Integer size, String name) {
    var pageable = PageRequest.of(page, size);
    var authorsPage = authorJpaRepository.findAllAuthorOrByName(name, pageable);

    var author = authorsPage.getContent().stream()
        .map(authorEntity -> new Author(authorEntity.getId(), authorEntity.getName()))
        .toList();

    return new AuthorPage(
        author,
        new Pagination(
            authorsPage.getTotalPages(),
            authorsPage.getTotalElements(),
            authorsPage.getNumber(),
            authorsPage.getSize()
        )
    );
  }

  @Override
  @Transactional
  public Author update(Author author) {
    var authorEntity = authorJpaRepository.findById(author.getId())
        .orElseThrow(() -> new IsNotFoundException("Author not found with id: " + author.getId()));
    authorEntity.setName(author.getName());
    authorJpaRepository.save(authorEntity);
    return new Author(authorEntity.getId(), authorEntity.getName());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    try {
      authorJpaRepository.deleteById(id);
    } catch (EmptyResultDataAccessException e) {
      throw new IsNotFoundException("Author not found with id: " + id);
    } catch (DataIntegrityViolationException e) {
      throw new IsDataBaseException("Integrity violation");
    }
  }
}