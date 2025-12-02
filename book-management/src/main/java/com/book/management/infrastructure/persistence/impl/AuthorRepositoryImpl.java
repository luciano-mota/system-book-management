package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
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
  public List<Author> findAll() {
    return authorJpaRepository.findAll().stream()
        .map(authorEntity -> new Author(authorEntity.getId(), authorEntity.getName()))
        .toList();
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