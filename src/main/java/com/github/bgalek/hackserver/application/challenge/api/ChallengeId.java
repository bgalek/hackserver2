package com.github.bgalek.hackserver.application.challenge.api;

public record ChallengeId(String value) {
    public static ChallengeId valueOf(String value) {
        return new ChallengeId(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
