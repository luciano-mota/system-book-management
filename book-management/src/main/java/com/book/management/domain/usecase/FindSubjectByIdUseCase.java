package com.book.management.domain.usecase;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;
import java.util.Optional;

public record FindSubjectByIdUseCase(SubjectRepository subjectRepository) {

  public Optional<Subject> find(Long id) {
    return subjectRepository.findById(id);
  }
}