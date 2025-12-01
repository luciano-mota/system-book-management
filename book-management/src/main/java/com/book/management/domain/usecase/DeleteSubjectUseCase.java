package com.book.management.domain.usecase;

import com.book.management.domain.repository.SubjectRepository;

public record DeleteSubjectUseCase(SubjectRepository subjectRepository) {

  public void delete(Long id) {
    subjectRepository.deleteById(id);
  }
}