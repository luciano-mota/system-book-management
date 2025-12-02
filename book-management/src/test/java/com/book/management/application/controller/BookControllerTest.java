package com.book.management.application.controller;

import static com.book.management.domain.mock.BookMock.buildBookMock;
import static com.book.management.domain.mock.BookRequestDTOMock.buildBookRequestMock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.book.management.domain.usecase.DeleteBookUseCase;
import com.book.management.domain.usecase.FindAllBookUseCase;
import com.book.management.domain.usecase.FindBookByIdUseCase;
import com.book.management.domain.usecase.InsertBookUseCase;
import com.book.management.domain.usecase.UpdateBookUseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private InsertBookUseCase insertBookUseCase;

  @MockitoBean
  private FindBookByIdUseCase findBookByIdUseCase;

  @MockitoBean
  private FindAllBookUseCase findAllBookUseCase;

  @MockitoBean
  private UpdateBookUseCase updateBookUseCase;

  @MockitoBean
  private DeleteBookUseCase deleteBookUseCase;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldReturnCreatedBookWithSuccess() throws Exception {
    var createBook = buildBookMock();
    var bookRequest = buildBookRequestMock();

    when(insertBookUseCase.insert(any())).thenReturn(createBook);

    mockMvc.perform(post("/api/v1/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(bookRequest)))
        .andExpect(status().isCreated());
  }

  @Test
  void shouldReturnBookWithSuccess() throws Exception {
    when(findBookByIdUseCase.find(any())).thenReturn(buildBookMock());

    mockMvc.perform(get("/api/v1/books/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnListOfBooksWithSuccess() throws Exception {
    var books = List.of(buildBookMock());
    when(findAllBookUseCase.find(any())).thenReturn(books);

    mockMvc.perform(get("/api/v1/books")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnUpdatedBookWithSuccess() throws Exception {
    var updatedBook = buildBookMock();
    var updatedBookRequest = buildBookRequestMock();

    when(updateBookUseCase.update(any())).thenReturn(updatedBook);

    mockMvc.perform(put("/api/v1/books/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(updatedBookRequest)))
        .andExpect(status().isOk());
  }

  @Test
  void shouldDeleteWithSuccess() throws Exception {
    doNothing().when(deleteBookUseCase).delete(any());

    mockMvc.perform(get("/api/v1/books/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}
