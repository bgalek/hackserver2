package com.github.bgalek.hackserver.application.player.api;

public non-sealed class RegisteredPlayer extends AnonymousPlayer {
    private final String id;
    private final String secret;

    public RegisteredPlayer(String id, String name, String host, Long port, String secret) {
        super(name, host, port);
        this.id = id;
        this.secret = secret;
    }

    public String getId() {
        return id;
    }

    public String getSecret() {
        return secret;
    }
}
