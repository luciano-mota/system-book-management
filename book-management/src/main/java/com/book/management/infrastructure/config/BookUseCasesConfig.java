package com.book.management.infrastructure.config;

import com.book.management.domain.repository.BookRepository;
import com.book.management.domain.usecase.DeleteBookUseCase;
import com.book.management.domain.usecase.FindAllBookUseCase;
import com.book.management.domain.usecase.FindBookByIdUseCase;
import com.book.management.domain.usecase.InsertBookUseCase;
import com.book.management.domain.usecase.UpdateBookUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class BookUseCasesConfig {

  private final BookRepository bookRepository;

  @Bean
  public InsertBookUseCase insertBookUseCase() {
    return new InsertBookUseCase(bookRepository);
  }

  @Bean
  public FindBookByIdUseCase findBookByIdUseCase() {
    return new FindBookByIdUseCase(bookRepository);
  }

  @Bean
  public FindAllBookUseCase findAllBookUseCase() {
    return new FindAllBookUseCase(bookRepository);
  }

  @Bean
  public UpdateBookUseCase updateBookUseCase() {
    return new UpdateBookUseCase(bookRepository);
  }

  @Bean
  public DeleteBookUseCase deleteBookUseCase() {
    return new DeleteBookUseCase(bookRepository);
  }
}