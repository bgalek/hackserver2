package com.github.bgalek.hackserver.application.logs;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeId;
import com.github.bgalek.hackserver.application.logs.api.LogEntry;
import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface LogRepository extends FirebaseRepository<LogEntry> {
    List<LogEntry> findAll();

    void insert(PlayerId playerId, ChallengeId challengeId, int score);

    void remove(PlayerId playerId, ChallengeId challengeId);

    @Override
    default Map<String, Object> serialize(LogEntry logEntry) {
        return Map.of(
                "playerId", logEntry.playerId(),
                "challangeId", logEntry.challengeId()
        );
    }

    @Override
    default LogEntry deserialize(DocumentSnapshot doc) {
        return new LogEntry(
                PlayerId.valueOf(doc.getString("playerId")),
                ChallengeId.valueOf(doc.getString("challengeId")),
                Optional.ofNullable(doc.get("score", Integer.class)).orElse(0)
        );
    }
}
