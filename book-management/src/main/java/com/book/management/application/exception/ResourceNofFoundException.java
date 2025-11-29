package com.book.management.application.exception;

public class ResourceNofFoundException extends RuntimeException {

    public ResourceNofFoundException(String message) {
        super(message);
    }
}