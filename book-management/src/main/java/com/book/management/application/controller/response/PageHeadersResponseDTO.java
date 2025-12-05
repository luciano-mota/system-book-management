package com.book.management.application.controller.response;

import com.book.management.domain.model.Pagination;
import org.springframework.http.HttpHeaders;

public final class PageHeadersResponseDTO {

  public static HttpHeaders buildHttpHeaders(Pagination pagination) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("X-Total-Count", String.valueOf(pagination.getTotalElements()));
    headers.add("X-Total-Pages", String.valueOf(pagination.getTotalPages()));
    headers.add("X-Current-Page", String.valueOf(pagination.getPage()));
    headers.add("X-Page-Size", String.valueOf(pagination.getSize()));
    return headers;
  }
}
