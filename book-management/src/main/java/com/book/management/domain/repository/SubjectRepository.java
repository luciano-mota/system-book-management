package com.book.management.domain.repository;

import com.book.management.domain.model.Subject;
import com.book.management.domain.model.SubjectPage;

public interface SubjectRepository {

  Subject save(Subject subject);

  Subject findById(Long id);

  SubjectPage findAll(Integer page, Integer size, String subject);

  void deleteById(Long id);

  Subject update(Subject subject);
}
