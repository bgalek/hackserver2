package com.github.bgalek.hackserver.application.player.api;

public record PlayerId(String value) {
    public static PlayerId valueOf(String value) {
        return new PlayerId(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
