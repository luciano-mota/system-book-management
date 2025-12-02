package com.book.management.infrastructure.config;

import com.book.management.domain.repository.SubjectRepository;
import com.book.management.domain.usecase.DeleteSubjectUseCase;
import com.book.management.domain.usecase.FindAllSubjectUseCase;
import com.book.management.domain.usecase.FindSubjectByIdUseCase;
import com.book.management.domain.usecase.InsertSubjectUseCase;
import com.book.management.domain.usecase.UpdateSubjectUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SubjectUseCasesConfig {

  @Bean
  public InsertSubjectUseCase insertSubjectUseCase(SubjectRepository subjectRepository) {
    return new InsertSubjectUseCase(subjectRepository);
  }

  @Bean
  public FindSubjectByIdUseCase findSubjectByIdUseCase(SubjectRepository subjectRepository) {
    return new FindSubjectByIdUseCase(subjectRepository);
  }

  @Bean
  public FindAllSubjectUseCase findAllSubjectUseCase(SubjectRepository subjectRepository) {
    return new FindAllSubjectUseCase(subjectRepository);
  }

  @Bean
  public UpdateSubjectUseCase updateSubjectUseCase(SubjectRepository subjectRepository) {
    return new UpdateSubjectUseCase(subjectRepository);
  }

  @Bean
  public DeleteSubjectUseCase deleteSubjectUseCase(SubjectRepository subjectRepository) {
    return new DeleteSubjectUseCase(subjectRepository);
  }
}
