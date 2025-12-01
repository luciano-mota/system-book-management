package com.book.management.domain.usecase;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;
import java.util.List;

public record FindAllSubjectUseCase(SubjectRepository subjectRepository) {

  public List<Subject> findAll() {
    return subjectRepository.findAll();
  }
}