package com.github.bgalek.hackserver.application.challenge.definitions;

import com.github.bgalek.hackserver.application.challenge.ChallengeRepository;
import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
class DefinitionsConfiguration {

    public DefinitionsConfiguration(List<ChallengeDefinition> challengeDefinitionList, ChallengeRepository challengeRepository) {
        challengeDefinitionList.forEach(challengeDefinition -> {
            challengeRepository.register(challengeDefinition);
        });
    }
}
