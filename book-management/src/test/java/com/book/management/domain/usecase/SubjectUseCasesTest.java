package com.book.management.domain.usecase;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.book.management.domain.model.Pagination;
import com.book.management.domain.model.Subject;
import com.book.management.domain.model.SubjectPage;
import com.book.management.domain.repository.SubjectRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SubjectUseCasesTest {

  @InjectMocks
  private FindSubjectByIdUseCase findSubjectByIdUseCase;

  @InjectMocks
  private FindAllSubjectUseCase findAllSubjectUseCase;

  @InjectMocks
  private InsertSubjectUseCase insertSubjectUseCase;

  @InjectMocks
  private UpdateSubjectUseCase updateSubjectUseCase;

  @InjectMocks
  private DeleteSubjectUseCase deleteSubjectUseCase;

  @Mock
  private SubjectRepository subjectRepository;

  @Test
  void shouldInsertSubjectWithSuccess() {
    var subject = new Subject(1L, "Teste");
    when(subjectRepository.save(any())).thenReturn(subject);

    var subjectResult = insertSubjectUseCase.create(subject);

    assertAll(
        () -> assertNotNull(subjectResult),
        () -> assertEquals(subject.getId(), subjectResult.getId()),
        () -> assertEquals(subject.getDescription(), subjectResult.getDescription()),
        () -> verify(subjectRepository).save(any())
    );
  }

  @Test
  void shouldFindSubjectByIdWithSuccess() {
    var subject = new Subject(1L, "Teste");
    when(subjectRepository.findById(any())).thenReturn(subject);

    var subjectResult = findSubjectByIdUseCase.find(1L);

    assertAll(
        () -> assertNotNull(subjectResult),
        () -> assertEquals(1L, subjectResult.getId()),
        () -> assertEquals("Teste", subjectResult.getDescription())
    );
  }

  @Test
  void shouldFindAllSubjectWithSuccess() {
    when(subjectRepository.findAll(any(), any(), any()))
        .thenReturn(
            new SubjectPage(
                List.of(new Subject(1L, "Teste")),
                new Pagination(1, 1L, 1, 1)
            )
        );

    var subjects = findAllSubjectUseCase.findAll(1, 1, "Teste");

    assertAll(
        () -> assertNotNull(subjects),
        () -> assertEquals(1, subjects.getSubjects().size()),
        () -> assertEquals(1L, subjects.getSubjects().get(0).getId()),
        () -> assertEquals("Teste", subjects.getSubjects().get(0).getDescription())
    );
  }

  @Test
  void shouldUpdateSubjectWithSuccess() {
    var subject = new Subject(1L, "Teste");
    when(subjectRepository.update(any())).thenReturn(subject);

    var subjectResult = updateSubjectUseCase.update(subject);

    assertAll(
        () -> assertNotNull(subjectResult),
        () -> assertEquals(1L, subjectResult.getId()),
        () -> assertEquals("Teste", subjectResult.getDescription())
    );
  }

  @Test
  void shouldDeleteSubjectWithSuccess() {
    doNothing().when(subjectRepository).deleteById(any());

    deleteSubjectUseCase.delete(1L);

    verify(subjectRepository).deleteById(any());
  }
}
