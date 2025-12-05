package com.book.management.application.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.book.management.domain.model.Author;
import com.book.management.domain.model.AuthorPage;
import com.book.management.domain.model.Pagination;
import com.book.management.domain.usecase.DeleteAuthorUseCase;
import com.book.management.domain.usecase.FindAllAuthorUseCase;
import com.book.management.domain.usecase.FindAuthorByIdUseCase;
import com.book.management.domain.usecase.InsertAuthorUseCase;
import com.book.management.domain.usecase.UpdateAuthorUseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.openapitools.model.AuthorRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class AuthorControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private InsertAuthorUseCase insertAuthorUseCase;

  @MockitoBean
  private FindAuthorByIdUseCase findAuthorByIdUseCase;

  @MockitoBean
  private FindAllAuthorUseCase findAllAuthorUseCase;

  @MockitoBean
  private UpdateAuthorUseCase updateAuthorUseCase;

  @MockitoBean
  private DeleteAuthorUseCase deleteAuthorUseCase;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldReturnCreatedAuthorWithSuccess() throws Exception {
    var createAuthor = new Author(1L, "Test");
    var authorRequest = new AuthorRequestDTO();
    authorRequest.setName("Test");

    when(insertAuthorUseCase.create(any())).thenReturn(createAuthor);

    mockMvc.perform(post("/api/v1/authors").contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(authorRequest))).andExpect(status().isCreated());
  }

  @Test
  void shouldReturnAuthorWithSuccess() throws Exception {
    when(findAuthorByIdUseCase.find(any())).thenReturn(new Author(1L, "Test"));

    mockMvc.perform(get("/api/v1/authors/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnListOfAuthorsWithSuccess() throws Exception {
    var authors = List.of(new Author(2L, "Jane Doe"));
    when(findAllAuthorUseCase.find(any(), any(), any()))
        .thenReturn(new AuthorPage(authors, new Pagination(1, 1L, 0, 1)));

    mockMvc.perform(get("/api/v1/authors")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnUpdatedAuthorWithSuccess() throws Exception {
    var updatedAuthor = new Author(1L, "Test");
    var updatedAuthorRequest = new AuthorRequestDTO();
    updatedAuthorRequest.setName("Test");

    when(updateAuthorUseCase.update(any())).thenReturn(updatedAuthor);

    mockMvc.perform(put("/api/v1/authors/{id}", 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedAuthorRequest))).
        andExpect(status().isOk());
  }

  @Test
  void shouldDeleteWithSuccess() throws Exception {
    doNothing().when(deleteAuthorUseCase).delete(any());

    mockMvc.perform(get("/api/v1/authors/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}