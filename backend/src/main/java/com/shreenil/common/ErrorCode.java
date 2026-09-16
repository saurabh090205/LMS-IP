package com.shreenil.common;

public enum ErrorCode {
    INTERNAL_SERVER_ERROR("ERR_INTERNAL_500", "An unexpected error occurred"),
    RESOURCE_NOT_FOUND("ERR_NOT_FOUND_404", "Resource not found"),
    VALIDATION_ERROR("ERR_VALIDATION_400", "Validation failed"),
    UNAUTHORIZED("ERR_AUTH_401", "Unauthorized access"),
    FORBIDDEN("ERR_FORBIDDEN_403", "Access denied"),
    BAD_REQUEST("ERR_BAD_REQUEST_400", "Invalid request");

    private final String code;
    private final String defaultMessage;

    ErrorCode(String code, String defaultMessage) {
        this.code = code;
        this.defaultMessage = defaultMessage;
    }

    public String getCode() {
        return code;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
