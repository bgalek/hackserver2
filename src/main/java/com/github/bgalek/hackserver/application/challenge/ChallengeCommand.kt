package com.github.bgalek.hackserver.application.challenge;

import org.springframework.stereotype.Service;

@Service
public class ChallengeCommand {
    private final ChallengeRepository challengeRepository;

    ChallengeCommand(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }
}
