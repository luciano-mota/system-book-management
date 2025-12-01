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
public record AuthorUseCasesConfig(AuthorRepository authorRepository) {

  @Bean
  public InsertAuthorUseCase insertAuthorUseCase() {
    return new InsertAuthorUseCase(authorRepository);
  }

  @Bean
  public FindAuthorByIdUseCase findAuthorByIdUseCase() {
    return new FindAuthorByIdUseCase(authorRepository);
  }

  @Bean
  public FindAllAuthorUseCase findAllAuthorUseCase() {
    return new FindAllAuthorUseCase(authorRepository);
  }

  @Bean
  public UpdateAuthorUseCase updateAuthorUseCase() {
    return new UpdateAuthorUseCase(authorRepository);
  }

  @Bean
  public DeleteAuthorUseCase deleteAuthorUseCase() {
    return new DeleteAuthorUseCase(authorRepository);
  }
}
