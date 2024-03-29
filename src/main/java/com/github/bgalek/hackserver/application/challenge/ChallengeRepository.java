package com.github.bgalek.hackserver.application.challenge;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import com.github.bgalek.hackserver.infrastructure.FirebaseRepository;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.Collection;
import java.util.Map;

public interface ChallengeRepository extends FirebaseRepository<ChallengeDefinition> {
    Collection<ChallengeDefinition> findAll();

    void register(ChallengeDefinition challengeDefinition);

    void activate(ChallengeDefinition challengeDefinition);

    @Override
    default Map<String, Object> serialize(ChallengeDefinition challengeDefinition) {
        return Map.of(
                "id", challengeDefinition.getId().value(),
                "name", challengeDefinition.getName(),
                "maxPoints", challengeDefinition.getMaxPoints(),
                "description", challengeDefinition.getDescription(),
                "endpoint", challengeDefinition.getChallengeEndpoint(),
                "solutionType", challengeDefinition.solutionType().getName(),
                "parameters", challengeDefinition.getChallengeParameters().stream().map(param -> Map.of(
                        "name", param.name(),
                        "desc", param.desc()
                )).toList(),
                "example", challengeDefinition.getExample(),
                "thumbnail", "https://picsum.photos/720/540"
        );
    }

    @Override
    default ChallengeDefinition deserialize(DocumentSnapshot doc) {
        throw new IllegalStateException("Not implemented yet");
    }
}
