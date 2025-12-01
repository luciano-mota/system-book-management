package com.book.management.application.controller;

import static org.springframework.http.HttpStatus.CREATED;

import com.book.management.application.mapper.SubjectMapper;
import com.book.management.domain.usecase.DeleteSubjectUseCase;
import com.book.management.domain.usecase.FindAllSubjectUseCase;
import com.book.management.domain.usecase.FindSubjectByIdUseCase;
import com.book.management.domain.usecase.InsertSubjectUseCase;
import com.book.management.domain.usecase.UpdateSubjectUseCase;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.SubjectsApi;
import org.openapitools.model.SubjectRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SubjectController implements SubjectsApi {

  private final InsertSubjectUseCase insertSubjectUseCase;
  private final FindSubjectByIdUseCase findSubjectByIdUseCase;
  private final FindAllSubjectUseCase findAllSubjectUseCase;
  private final UpdateSubjectUseCase updateSubjectUseCase;
  private final DeleteSubjectUseCase deleteSubjectUseCase;

  private final SubjectMapper subjectMapper;

  @Override
  public ResponseEntity<GenericRestReturnDTO> createSubject(HttpServletRequest httpServletRequest,
      SubjectRequestDTO subjectRequestDTO) {
    var subject = subjectMapper.toDomain(subjectRequestDTO);
    var savedSubject = insertSubjectUseCase.create(subject);

    return ResponseEntity.status(CREATED).body(
        new GenericRestReturnDTO(
            subjectMapper.toResponse(savedSubject)
        )
    );
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getAllSubjects(
      HttpServletRequest httpServletRequest) {
    var subjects = findAllSubjectUseCase.findAll().stream()
        .map(subjectMapper::toResponse)
        .toList();
    return ResponseEntity.ok(new GenericRestReturnDTO(subjects));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getSubjectById(HttpServletRequest httpServletRequest,
      Long id) {
    var subject = findSubjectByIdUseCase.find(id);
    return ResponseEntity.ok(new GenericRestReturnDTO(subjectMapper.toResponse(subject)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> updateSubject(HttpServletRequest httpServletRequest,
      Long id, SubjectRequestDTO subjectRequestDTO) {
    var subject = subjectMapper.toDomain(subjectRequestDTO);
    subject.setId(id);
    var updatedSubject = updateSubjectUseCase.update(subject);

    return ResponseEntity.ok(new GenericRestReturnDTO(subjectMapper.toResponse(updatedSubject)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> deleteSubject(HttpServletRequest httpServletRequest,
      Long id) {
    deleteSubjectUseCase.delete(id);
    return ResponseEntity.noContent().build();
  }
}
