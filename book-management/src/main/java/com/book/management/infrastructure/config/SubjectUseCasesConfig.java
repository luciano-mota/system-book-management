package com.book.management.infrastructure.config;

import com.book.management.domain.repository.SubjectRepository;
import com.book.management.domain.usecase.DeleteSubjectUseCase;
import com.book.management.domain.usecase.FindAllSubjectUseCase;
import com.book.management.domain.usecase.FindSubjectByIdUseCase;
import com.book.management.domain.usecase.InsertSubjectUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public record SubjectUseCasesConfig(SubjectRepository subjectRepository) {

  @Bean
  public InsertSubjectUseCase insertSubjectUseCase() {
    return new InsertSubjectUseCase(subjectRepository);
  }

  @Bean
  public FindSubjectByIdUseCase findSubjectByIdUseCase() {
    return new FindSubjectByIdUseCase(subjectRepository);
  }

  @Bean
  public FindAllSubjectUseCase findAllSubjectUseCase() {
    return new FindAllSubjectUseCase(subjectRepository);
  }

  @Bean
  public DeleteSubjectUseCase deleteSubjectUseCase() {
    return new DeleteSubjectUseCase(subjectRepository);
  }
}