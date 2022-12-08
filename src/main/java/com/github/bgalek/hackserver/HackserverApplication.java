package com.github.bgalek.hackserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class HackserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(HackserverApplication.class, args);
    }

}
