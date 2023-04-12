package com.github.bgalek.hackserver.application.logs.api;

import com.github.bgalek.hackserver.application.challenge.api.ChallengeId;
import com.github.bgalek.hackserver.application.player.api.PlayerId;

public record LogEntry(PlayerId playerId, ChallengeId challengeId, int score) {
}
