package com.github.bgalek.hackserver.application.player;

import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerQuery {

    private final PlayerRepository playerRepository;

    PlayerQuery(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<RegisteredPlayer> findAll() {
        return playerRepository.findAll();
    }
}
