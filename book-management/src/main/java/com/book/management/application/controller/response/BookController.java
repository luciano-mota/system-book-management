package com.book.management.application.controller.response;

import static org.springframework.http.HttpStatus.CREATED;

import com.book.management.application.controller.GenericRestReturnDTO;
import com.book.management.application.exception.ResourceNofFoundException;
import com.book.management.application.mapper.BookMapper;
import com.book.management.domain.usecase.DeleteBookUseCase;
import com.book.management.domain.usecase.FindAllBookUseCase;
import com.book.management.domain.usecase.FindBookByIdUseCase;
import com.book.management.domain.usecase.InsertBookUseCase;
import com.book.management.domain.usecase.UpdateBookUseCase;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.BooksApi;
import org.openapitools.model.BookRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BookController implements BooksApi {

  private final InsertBookUseCase insertBookUseCase;
  private final FindAllBookUseCase findAllBookUseCase;
  private final FindBookByIdUseCase findBookByIdUseCase;
  private final UpdateBookUseCase updateBookUseCase;
  private final DeleteBookUseCase deleteBookUseCase;

  private final BookMapper bookMapper;

  @Override
  public ResponseEntity<GenericRestReturnDTO> createBook(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse, BookRequestDTO bookRequestDTO) {
    var book = bookMapper.toDomain(bookRequestDTO);
    var savedBook = insertBookUseCase.insert(book);

    return ResponseEntity.status(CREATED).body(new GenericRestReturnDTO(bookMapper.toResponse(savedBook)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getBookById(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse, Long id) {
    var book = findBookByIdUseCase.find(id).orElseThrow(
        () -> new ResourceNofFoundException("Book not found with id: " + id));
    return ResponseEntity.ok(new GenericRestReturnDTO(bookMapper.toResponse(book)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> getAllBooks(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse) {
    var books = findAllBookUseCase.find();
    var bookResponse = books.stream()
        .map(bookMapper::toResponse)
        .toList();
    return ResponseEntity.ok(new GenericRestReturnDTO(bookResponse));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> updateBook(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse, Long id, BookRequestDTO bookRequestDTO) {
    var book = bookMapper.toDomain(bookRequestDTO);
    book.setId(id);
    var updatedBook = updateBookUseCase.update(book);

    return ResponseEntity.ok(new GenericRestReturnDTO(bookMapper.toResponse(updatedBook)));
  }

  @Override
  public ResponseEntity<GenericRestReturnDTO> deleteBook(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse, Long id) {
    deleteBookUseCase.delete(id);
    return ResponseEntity.noContent().build();
  }
}