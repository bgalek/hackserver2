package com.github.bgalek.hackserver.application.challenge;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import com.github.bgalek.hackserver.application.player.api.AnonymousPlayer;
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.List;
import java.util.Map;
import java.util.Optional;

interface ChallengeRepository extends FirebaseRepository<ChallengeDefinition> {
    List<ChallengeDefinition> findAll();

    @Override
    default Map<String, Object> serialize(ChallengeDefinition value) {
        return null;
    }

    @Override
    default ChallengeDefinition deserialize(DocumentSnapshot doc) {
        return null;
    }
}
