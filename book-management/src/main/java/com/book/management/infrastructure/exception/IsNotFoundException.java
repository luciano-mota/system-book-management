package com.book.management.infrastructure.exception;

public class IsNotFoundException extends RuntimeException {

    public IsNotFoundException(String message) {
        super(message);
    }
}