package com.book.management.infrastructure.config;

import com.book.management.domain.repository.BookRepository;
import com.book.management.domain.usecase.DeleteBookUseCase;
import com.book.management.domain.usecase.FindAllBookUseCase;
import com.book.management.domain.usecase.FindBookByIdUseCase;
import com.book.management.domain.usecase.InsertBookUseCase;
import com.book.management.domain.usecase.UpdateBookUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookUseCasesConfig {

  @Bean
  public InsertBookUseCase insertBookUseCase(BookRepository bookRepository) {
    return new InsertBookUseCase(bookRepository);
  }

  @Bean
  public FindBookByIdUseCase findBookByIdUseCase(BookRepository bookRepository) {
    return new FindBookByIdUseCase(bookRepository);
  }

  @Bean
  public FindAllBookUseCase findAllBookUseCase(BookRepository bookRepository) {
    return new FindAllBookUseCase(bookRepository);
  }

  @Bean
  public UpdateBookUseCase updateBookUseCase(BookRepository bookRepository) {
    return new UpdateBookUseCase(bookRepository);
  }

  @Bean
  public DeleteBookUseCase deleteBookUseCase(BookRepository bookRepository) {
    return new DeleteBookUseCase(bookRepository);
  }
}
