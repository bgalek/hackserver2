package com.github.bgalek.hackserver.application.player;

import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.HealthStatus;
import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.net.InetSocketAddress;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

interface PlayerRepository extends FirebaseRepository<RegisteredPlayer> {
    List<RegisteredPlayer> findAll();

    Optional<RegisteredPlayer> findById(String id);

    RegisteredPlayer savePlayer(AnonymousPlayer anonymousPlayer);

    void updateHealth(PlayerId playerId, HealthStatus healthStatus);

    @Override
    default Map<String, Object> serialize(RegisteredPlayer registeredPlayer) {
        return Map.of(
                "name", registeredPlayer.getName(),
                "host", registeredPlayer.getInetSocketAddress().getHostString(),
                "port", registeredPlayer.getInetSocketAddress().getPort(),
                "secret", registeredPlayer.getSecret()
        );
    }

    @Override
    default RegisteredPlayer deserialize(DocumentSnapshot doc) {
        return new RegisteredPlayer(
                PlayerId.valueOf(doc.getId()),
                doc.getString("name"),
                InetSocketAddress.createUnresolved(
                        Objects.requireNonNull(doc.getString("host")),
                        Math.toIntExact(Objects.requireNonNull(doc.getLong("port")))
                ),
                doc.getString("secret")
        );
    }
}
