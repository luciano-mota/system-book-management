package com.book.management.infrastructure.persistence.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "tb_author")
public class AuthorEntity {

  @Id
  @Column(name = "author_code")
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 40)
  private String name;

  public AuthorEntity(String name) {
    this.name = name;
  }
}
