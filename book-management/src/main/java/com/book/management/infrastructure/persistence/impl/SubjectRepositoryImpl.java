package com.book.management.infrastructure.persistence.impl;

import com.book.management.domain.model.Subject;
import com.book.management.domain.repository.SubjectRepository;
import com.book.management.infrastructure.exception.IsDataBaseException;
import com.book.management.infrastructure.exception.IsNotFoundException;
import com.book.management.infrastructure.persistence.entity.SubjectEntity;
import com.book.management.infrastructure.persistence.repository.SubjectJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class SubjectRepositoryImpl implements SubjectRepository {

  private final SubjectJpaRepository subjectJpaRepository;

  @Override
  @Transactional
  public Subject save(Subject subject) {
    var subjectEntity = subjectJpaRepository.save(new SubjectEntity(subject.getDescription().toUpperCase()));
    return new Subject(subjectEntity.getId(), subjectEntity.getDescription());
  }

  @Override
  @Transactional(readOnly = true)
  public Subject findById(Long id) {
    var subjectEntity = subjectJpaRepository.findById(id)
        .orElseThrow(() -> new IsNotFoundException("Subject not found with id: " + id));
    return new Subject(subjectEntity.getId(), subjectEntity.getDescription());
  }

  @Override
  @Transactional(readOnly = true)
  public List<Subject> findAll(String subject) {
    return subjectJpaRepository.findAllSubjectOrByDescription(subject).stream()
        .map(subjectEntity -> new Subject(subjectEntity.getId(), subjectEntity.getDescription()))
        .toList();
  }

  @Override
  @Transactional
  public Subject update(Subject subject) {
    var subjectEntity = subjectJpaRepository.findById(subject.getId())
        .orElseThrow(() -> new IsNotFoundException("Subject not found with id: " + subject.getId()));
    subjectEntity.setDescription(subject.getDescription());
    subjectEntity = subjectJpaRepository.save(subjectEntity);
    return new Subject(subjectEntity.getId(), subjectEntity.getDescription());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    try {
      subjectJpaRepository.deleteById(id);
    } catch (EmptyResultDataAccessException e) {
      throw new IsNotFoundException("Subject not found with id: " + id);
    } catch (DataIntegrityViolationException e) {
      throw new IsDataBaseException("Integrity violation");
    }
  }
}