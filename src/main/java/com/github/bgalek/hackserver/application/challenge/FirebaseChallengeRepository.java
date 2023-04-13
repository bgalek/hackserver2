package com.github.bgalek.hackserver.application.challenge;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Component
class FirebaseChallengeRepository implements ChallengeRepository {

    private final CollectionReference challengeCollection;
    private final Map<String, ChallengeDefinition> runtimeCollection = new HashMap<>();

    public FirebaseChallengeRepository(Firestore firestore) {
        this.challengeCollection = firestore.collection("challenges");
    }

    @Override
    public List<ChallengeDefinition> findAll() {
        return runtimeCollection.values().stream().toList();
    }

    @Override
    public void register(ChallengeDefinition challengeDefinition) {
        try {
            challengeCollection.document(challengeDefinition.getId().value()).set(serialize(challengeDefinition)).get();
            runtimeCollection.put(challengeCollection.getId(), challengeDefinition);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void activate(ChallengeDefinition challengeDefinition) {
        throw new IllegalStateException("Not implemented yet");
    }
}
