package com.github.bgalek.hackserver.application.challenge;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.List;
import java.util.Map;

public interface ChallengeRepository extends FirebaseRepository<ChallengeDefinition> {
    List<ChallengeDefinition> findAll();

    @Override
    default Map<String, Object> serialize(ChallengeDefinition challengeDefinition) {
        return Map.of(
                "id", challengeDefinition.getId(),
                "name", challengeDefinition.getName(),
                "thumbnail", "https://picsum.photos/720/540"
        );
    }

    @Override
    default ChallengeDefinition deserialize(DocumentSnapshot doc) {
        return null;
    }

    void register(ChallengeDefinition challengeDefinition);
}
