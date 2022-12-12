package com.github.bgalek.hackserver.application.challenge;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Component
class FirebaseChallengeRepository implements ChallengeRepository {

    private final CollectionReference challengeCollection;

    public FirebaseChallengeRepository(Firestore firestore) {
        this.challengeCollection = firestore.collection("challenges");
    }

    @Override
    public List<ChallengeDefinition> findAll() {
        try {
            QuerySnapshot querySnapshot = challengeCollection.get().get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            return documents.stream().map(this::deserialize).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void register(ChallengeDefinition challengeDefinition) {
        String id = challengeCollection.document().getId();
        try {
            challengeCollection.document(id).create(serialize(challengeDefinition)).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
