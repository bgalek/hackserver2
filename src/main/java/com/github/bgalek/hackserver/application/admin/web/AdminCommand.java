package com.github.bgalek.hackserver.application.admin.web;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminCommand {
    public String login(AdminLoginRequest adminLoginRequest) {
        if (adminLoginRequest.password().equals("pass")) {
            return "secret";
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
}
