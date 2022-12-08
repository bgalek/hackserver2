package com.github.bgalek.hackserver.application.player;

import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.HealthStatus;
import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Component
class FirebasePlayerRepository implements PlayerRepository {

    private final CollectionReference playersCollection;

    public FirebasePlayerRepository(Firestore firestore) {
        this.playersCollection = firestore.collection("players");
    }

    @Override
    public List<RegisteredPlayer> findAll() {
        try {
            QuerySnapshot querySnapshot = playersCollection.get().get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            return documents.stream().map(this::deserialize).collect(Collectors.toList()
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<RegisteredPlayer> findById(String id) {
        try {
            DocumentSnapshot documentSnapshot = playersCollection.document(id).get().get();
            if (!documentSnapshot.exists()) return Optional.empty();
            return Optional.of(documentSnapshot).map(this::deserialize);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public RegisteredPlayer savePlayer(AnonymousPlayer anonymousPlayer) {
        String id = playersCollection.document().getId();
        String secret = UUID.randomUUID().toString();
        RegisteredPlayer registeredPlayer = new RegisteredPlayer(
                PlayerId.valueOf(id),
                anonymousPlayer.getName(),
                anonymousPlayer.getInetSocketAddress(),
                secret
        );
        try {
            playersCollection.document(id).create(serialize(registeredPlayer)).get();
            return registeredPlayer;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateHealth(PlayerId playerId, HealthStatus healthStatus) {
        try {
            playersCollection.document(playerId.value()).update("status", healthStatus.name()).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
