package com.book.management.domain.repository;

import com.book.management.domain.model.Subject;
import java.util.List;

public interface SubjectRepository {

  Subject save(Subject subject);

  Subject findById(Long id);

  List<Subject> findAll();

  void deleteById(Long id);

  Subject update(Subject subject);
}
