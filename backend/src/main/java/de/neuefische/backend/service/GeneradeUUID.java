package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GeneradeUUID {

    public String getUUID() {
        return UUID.randomUUID().toString();
    }
}
