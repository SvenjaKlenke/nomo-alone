package de.neuefische.backend.security;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = getErrorMessage(fieldName);
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }


    private String getErrorMessage(String fieldName) {
        if (fieldName.equals("username")) {
            return "Username must have at least 4 characters and maximum 20 characters";
        }
        if (fieldName.equals("name")) {
            return "The name must not contain any numbers.";
        }
        if (fieldName.equals("lastname")) {
            return "The Lastname must not contain any numbers.";
        }
        if (fieldName.equals("email")) {
            return "Email address does not have a valid format.";
        }
        if (fieldName.equals("password")) {
            return "Password must have at least 8 characters, including uppercase and lowercase letters, at least one number, and one special character.";
        }
        return "Invalid field value.";
    }
}
