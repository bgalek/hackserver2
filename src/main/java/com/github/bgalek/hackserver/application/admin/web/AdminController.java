package com.github.bgalek.hackserver.application.admin.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/admin")
class AdminController {

    private final AdminCommand adminCommand;

    public AdminController(AdminCommand adminCommand) {
        this.adminCommand = adminCommand;
    }

    @PostMapping("/login")
    ResponseEntity<String> register(@RequestBody AdminLoginRequest adminLoginRequest) {
        String secret = adminCommand.login(adminLoginRequest);
        return ResponseEntity.ok(secret);
    }
}
