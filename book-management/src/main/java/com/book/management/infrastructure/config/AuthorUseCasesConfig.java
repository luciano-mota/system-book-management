package com.book.management.infrastructure.config;

import com.book.management.domain.repository.AuthorRepository;
import com.book.management.domain.usecase.DeleteAuthorUseCase;
import com.book.management.domain.usecase.FindAllAuthorUseCase;
import com.book.management.domain.usecase.FindAuthorByIdUseCase;
import com.book.management.domain.usecase.InsertAuthorUseCase;
import com.book.management.domain.usecase.UpdateAuthorUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthorUseCasesConfig {

  @Bean
  public InsertAuthorUseCase insertAuthorUseCase(AuthorRepository authorRepository) {
    return new InsertAuthorUseCase(authorRepository);
  }

  @Bean
  public FindAuthorByIdUseCase findAuthorByIdUseCase(AuthorRepository authorRepository) {
    return new FindAuthorByIdUseCase(authorRepository);
  }

  @Bean
  public FindAllAuthorUseCase findAllAuthorUseCase(AuthorRepository authorRepository) {
    return new FindAllAuthorUseCase(authorRepository);
  }

  @Bean
  public UpdateAuthorUseCase updateAuthorUseCase(AuthorRepository authorRepository) {
    return new UpdateAuthorUseCase(authorRepository);
  }

  @Bean
  public DeleteAuthorUseCase deleteAuthorUseCase(AuthorRepository authorRepository) {
    return new DeleteAuthorUseCase(authorRepository);
  }
}
