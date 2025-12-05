package com.book.management.domain.usecase;

import com.book.management.domain.model.SubjectPage;
import com.book.management.domain.repository.SubjectRepository;

public record FindAllSubjectUseCase(SubjectRepository subjectRepository) {

  public SubjectPage findAll(Integer page, Integer size, String subject) {
    return subjectRepository.findAll(page, size, subject);
  }
}