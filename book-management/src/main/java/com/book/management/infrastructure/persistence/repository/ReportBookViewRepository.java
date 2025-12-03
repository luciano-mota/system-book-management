package com.book.management.infrastructure.persistence.repository;

import com.book.management.infrastructure.persistence.view.ReportBookView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportBookViewRepository extends JpaRepository<ReportBookView, Long> {

}
