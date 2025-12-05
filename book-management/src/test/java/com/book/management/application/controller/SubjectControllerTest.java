package com.book.management.application.controller;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.book.management.domain.model.Pagination;
import com.book.management.domain.model.Subject;
import com.book.management.domain.model.SubjectPage;
import com.book.management.domain.usecase.DeleteSubjectUseCase;
import com.book.management.domain.usecase.FindAllSubjectUseCase;
import com.book.management.domain.usecase.FindSubjectByIdUseCase;
import com.book.management.domain.usecase.InsertSubjectUseCase;
import com.book.management.domain.usecase.UpdateSubjectUseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.openapitools.model.SubjectRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SubjectControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private InsertSubjectUseCase insertSubjectUseCase;

  @MockitoBean
  private FindSubjectByIdUseCase findSubjectByIdUseCase;

  @MockitoBean
  private FindAllSubjectUseCase findAllSubjectUseCase;

  @MockitoBean
  private UpdateSubjectUseCase updateSubjectUseCase;

  @MockitoBean
  private DeleteSubjectUseCase deleteSubjectUseCase;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldReturnCreatedSubjectWithSuccess() throws Exception {
    var createSubject = new Subject(1L, "Test");
    var subjectRequest = new SubjectRequestDTO();
    subjectRequest.setDescription("Test");

    when(insertSubjectUseCase.create(any())).thenReturn(createSubject);

    mockMvc.perform(post("/api/v1/subjects")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(subjectRequest)))
        .andExpect(status().isCreated());
  }

  @Test
  void shouldReturnSubjectWithSuccess() throws Exception {
    when(findSubjectByIdUseCase.find(any())).thenReturn(new Subject(1L, "Test"));

    mockMvc.perform(get("/api/v1/subjects/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnListOfSubjectsWithSuccess() throws Exception {
    var subjects = List.of(new Subject(2L, "Science"));
    when(findAllSubjectUseCase.findAll(any(), any(), any()))
        .thenReturn(new SubjectPage(subjects, new Pagination(1, 1L, 0, 1)));

    mockMvc.perform(get("/api/v1/subjects")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnUpdatedSubjectWithSuccess() throws Exception {
    var updatedSubject = new Subject(1L, "Test");
    var updatedSubjectRequest = new SubjectRequestDTO();
    updatedSubjectRequest.setDescription("Test");

    when(updateSubjectUseCase.update(any())).thenReturn(updatedSubject);

    mockMvc.perform(put("/api/v1/subjects/{id}", 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedSubjectRequest))
    ).andExpect(status().isOk());
  }

  @Test
  void shouldDeleteWithSuccess() throws Exception {
    doNothing().when(deleteSubjectUseCase).delete(any());

    mockMvc.perform(get("/api/v1/subjects/{id}", 1L)
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}