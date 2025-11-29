package com.book.management.domain.repository;

import com.book.management.domain.model.Subject;
import java.util.List;
import java.util.Optional;

public interface SubjectRepository {

  Subject save(Subject subject);

  Optional<Subject> findById(Long id);

  List<Subject> findAll();

  void deleteById(Long id);
}
