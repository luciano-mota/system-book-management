package com.book.management.domain.repository;

import com.book.management.domain.model.Report;
import java.util.List;

public interface ReportRepository {

  List<Report> find();
}