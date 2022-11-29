package com.github.bgalek.hackserver.application.player;

import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import org.springframework.stereotype.Service;

@Service
public class PlayerCommand {

    private final PlayerRepository playerRepository;

    PlayerCommand(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public RegisteredPlayer register(AnonymousPlayer anonymousPlayer) {
        return playerRepository.savePlayer(anonymousPlayer);
    }
}
