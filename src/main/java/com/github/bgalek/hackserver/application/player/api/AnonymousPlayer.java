package com.github.bgalek.hackserver.application.player.api;

public sealed class AnonymousPlayer permits RegisteredPlayer {
    private final String name;
    private final String host;
    private final long port;

    public AnonymousPlayer(String name, String host, long port) {
        this.name = name;
        this.host = host;
        this.port = port;
    }

    public String getName() {
        return name;
    }

    public String getHost() {
        return host;
    }

    public long getPort() {
        return port;
    }
}
