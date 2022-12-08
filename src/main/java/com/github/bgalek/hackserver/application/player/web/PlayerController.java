package com.github.bgalek.hackserver.application.player.web;

import com.github.bgalek.hackserver.application.player.PlayerCommand;
import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetSocketAddress;
import java.net.URI;

@RestController
@RequestMapping(value = "/api/players")
class PlayerController {

    private final PlayerCommand playerCommand;

    PlayerController(PlayerCommand playerCommand) {
        this.playerCommand = playerCommand;
    }

    @PostMapping
    ResponseEntity<RegisteredPlayerResponse> register(@RequestBody RegistrationRequest registrationRequest) {
        AnonymousPlayer anonymousPlayer = new AnonymousPlayer(
                registrationRequest.name(),
                InetSocketAddress.createUnresolved(registrationRequest.host(), registrationRequest.port())
        );
        RegisteredPlayer registeredPlayer = playerCommand.register(anonymousPlayer);
        RegisteredPlayerResponse registeredPlayerResponse = new RegisteredPlayerResponse(
                registeredPlayer.getId().value(),
                registeredPlayer.getSecret()
        );
        return ResponseEntity
                .created(URI.create("/players/%s".formatted(registeredPlayer.getId())))
                .body(registeredPlayerResponse);
    }
}
