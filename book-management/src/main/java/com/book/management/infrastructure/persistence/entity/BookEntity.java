package com.book.management.infrastructure.persistence.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "tb_book")
public class BookEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  private Integer bookCode;

  @Column(nullable = false, length = 40)
  private String title;

  @Column(nullable = false, length = 40)
  private String publisher;

  @Column(nullable = false, length = 40)
  private String edition;

  @Column(nullable = false, length = 4)
  private String publicationDate;

  @Column(nullable = false, precision = 15, scale = 2)
  private BigDecimal price;

  @ManyToMany
  @JoinTable(
      name = "tb_book_author",
      joinColumns = @JoinColumn(name = "book_code", referencedColumnName = "bookCode"),
      inverseJoinColumns = @JoinColumn(name = "author_code"))
  private Set<AuthorEntity> authors;

  @ManyToMany
  @JoinTable(
      name = "tb_book_subject",
      joinColumns = @JoinColumn(name = "book_code", referencedColumnName = "bookCode"),
      inverseJoinColumns = @JoinColumn(name = "subject_code"))
  private Set<SubjectEntity> subjects;
}