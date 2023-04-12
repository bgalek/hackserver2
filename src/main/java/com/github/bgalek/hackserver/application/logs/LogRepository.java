package com.github.bgalek.hackserver.application.logs;

import com.github.bgalek.hackserver.application.challenge.ChallengeRunResult;
import com.github.bgalek.hackserver.application.logs.api.LogEntry;
import com.github.bgalek.hackserver.application.player.api.PlayerId;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Map;

public interface LogRepository extends FirebaseRepository<LogEntry> {
    List<LogEntry> findAll();

    void insert(@NotNull ChallengeRunResult challengeRunResult);

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
                doc.getString("challengeId")
        );
    }
}
