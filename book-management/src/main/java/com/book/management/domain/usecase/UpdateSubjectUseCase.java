package com.book.management.domain.usecase;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;

public record UpdateSubjectUseCase(SubjectRepository subjectRepository) {

  public Subject update(Subject subject) {
    var subjectEntity = subjectRepository.findById(subject.getId());
    return subjectRepository.save(subjectEntity);
  }
}