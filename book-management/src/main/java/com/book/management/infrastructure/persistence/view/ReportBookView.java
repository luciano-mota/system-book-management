package com.book.management.infrastructure.persistence.view;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VIEW_REPORT_BOOK")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportBookView {

  @Id
  @Column(name = "BOOK_CODE")
  private Long bookCode;

  @Column(name = "BOOK_TITLE")
  private String bookTitle;

  @Column(name = "PUBLISHER")
  private String publisher;

  @Column(name = "EDITION")
  private String edition;

  @Column(name = "YEAR_PUBLICATION")
  private String yearPublication;

  @Column(name = "PRICE")
  private BigDecimal price;

  @Column(name = "AUTHORS")
  private String authors;

  @Column(name = "SUBJECTS")
  private String subjects;

}
