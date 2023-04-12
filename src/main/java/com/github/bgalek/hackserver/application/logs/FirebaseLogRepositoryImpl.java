package com.github.bgalek.hackserver.application.logs;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeId;
import com.github.bgalek.hackserver.application.logs.api.LogEntry;
import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Component
public class FirebaseLogRepositoryImpl implements LogRepository {
    private final CollectionReference logCollection;

    public FirebaseLogRepositoryImpl(Firestore firestore) {
        this.logCollection = firestore.collection("logs");
    }

    @Override
    public List<LogEntry> findAll() {
        try {
            QuerySnapshot querySnapshot = logCollection.get().get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            return documents.stream().map(this::deserialize).collect(Collectors.toList()
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void remove(PlayerId playerId, ChallengeId challengeId) {
        logCollection
                .whereEqualTo("playerId", playerId)
                .whereEqualTo("challengeId", challengeId)
                .get()
                .resultNow()
                .getDocuments()
                .forEach(document -> document.getReference().delete());
    }

    @Override
    public void insert(PlayerId playerId, ChallengeId challengeId, int score) {
        LogEntry logEntry = new LogEntry(playerId, challengeId, score);
        try {
            logCollection.document().create(serialize(logEntry)).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
