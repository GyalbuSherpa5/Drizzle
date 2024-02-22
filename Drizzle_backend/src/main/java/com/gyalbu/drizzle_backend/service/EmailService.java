package com.gyalbu.drizzle_backend.service;

public interface EmailService {
    void email(String to, String subject, String content);
}
