package com.github.bgalek.hackserver.application.challenge.web;

import com.github.bgalek.hackserver.application.challenge.ChallengeCommand;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/challenge")
class ChallengeController {

    private final ChallengeCommand challengeCommand;

    ChallengeController(ChallengeCommand challengeCommand) {
        this.challengeCommand = challengeCommand;
    }
}
