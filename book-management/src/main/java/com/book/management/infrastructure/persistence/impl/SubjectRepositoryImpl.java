package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SubjectRepositoryImpl implements SubjectRepository {

  private final SubjectJpaRepository subjectJpaRepository;

  @Override
  public Subject save(Subject subject) {
    var subjectEntity = subjectJpaRepository.save(new SubjectEntity(subject.getDescription()));
    return new Subject(subjectEntity.getId(), subjectEntity.getDescription());
  }

  @Override
  public Subject findById(Long id) {
    var subjectEntity = subjectJpaRepository.findById(id)
        .orElseThrow(() -> new IsNotFoundException("Subject not found with id: " + id));
    return new Subject(subjectEntity.getId(), subjectEntity.getDescription());
  }

  @Override
  public List<Subject> findAll() {
    return subjectJpaRepository.findAll().stream()
        .map(subjectEntity -> new Subject(subjectEntity.getId(), subjectEntity.getDescription()))
        .toList();
  }

  @Override
  public void deleteById(Long id) {
    subjectJpaRepository.deleteById(id);
  }
}
