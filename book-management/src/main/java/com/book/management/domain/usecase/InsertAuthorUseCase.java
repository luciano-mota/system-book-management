package com.book.management.domain.usecase;

import com.book.management.domain.model.Author;
import com.book.management.domain.repository.AuthorRepository;

public record InsertAuthorUseCase(AuthorRepository authorRepository) {

  public Author create(Author author) {
    var newAuthor = Author.newAuthor(author.getName());
    return authorRepository.save(newAuthor);
  }
}