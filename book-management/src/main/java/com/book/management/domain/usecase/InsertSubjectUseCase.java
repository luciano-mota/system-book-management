package com.book.management.domain.usecase;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;

public record InsertSubjectUseCase(SubjectRepository subjectRepository) {

  public Subject create(Subject subject) {
    var newSubject = Subject.newSubject(subject.getDescription());
    return subjectRepository.save(newSubject);
  }
}