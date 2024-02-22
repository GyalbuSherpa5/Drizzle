package com.gyalbu.drizzle_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DrizzleBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DrizzleBackendApplication.class, args);
    }

}
