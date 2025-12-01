package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.AuthorEntity;
import com.book.management.infrastructure.persistence.repository.AuthorJpaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
  @Transactional
  public Author findById(Long id) {
    var authorEntity = authorJpaRepository.findById(id)
        .orElseThrow(() -> new IsNotFoundException("Author not found with id: " + id));
    return new Author(authorEntity.getId(), authorEntity.getName());
  }

  @Override
  public List<Author> findAll() {
    return authorJpaRepository.findAll().stream()
        .map(authorEntity -> new Author(authorEntity.getId(), authorEntity.getName()))
        .toList();
  }

  @Override
  public void deleteById(Long id) {
    authorJpaRepository.deleteById(id);
  }
}