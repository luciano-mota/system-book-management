package com.book.management.domain.usecase;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;

public record FindSubjectByIdUseCase(SubjectRepository subjectRepository) {

  public Subject find(Long id) {
    return subjectRepository.findById(id);
  }
}