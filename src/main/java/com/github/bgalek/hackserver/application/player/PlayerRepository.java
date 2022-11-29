package com.github.bgalek.hackserver.application.player;

import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.List;
import java.util.Map;
import java.util.Optional;

interface PlayerRepository extends FirebaseRepository<RegisteredPlayer> {
    List<RegisteredPlayer> findAll();

    Optional<RegisteredPlayer> findById(String id);

    RegisteredPlayer savePlayer(AnonymousPlayer anonymousPlayer);

    @Override
    default Map<String, Object> serialize(RegisteredPlayer registeredPlayer) {
        return Map.of(
                "name", registeredPlayer.getName(),
                "host", registeredPlayer.getHost(),
                "port", registeredPlayer.getPort(),
                "secret", registeredPlayer.getSecret()
        );
    }

    @Override
    default RegisteredPlayer deserialize(DocumentSnapshot doc) {
        return new RegisteredPlayer(
                doc.getId(),
                doc.getString("name"),
                doc.getString("host"),
                doc.getLong("port"),
                doc.getString("secret")
        );
    }
}
