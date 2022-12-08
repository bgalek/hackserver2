package com.github.bgalek.hackserver.application.player.api;

import java.net.InetSocketAddress;
import java.net.URI;

public non-sealed class RegisteredPlayer extends AnonymousPlayer {
    private final PlayerId id;
    private final String secret;
    private HealthStatus healthStatus = HealthStatus.UNKNOWN;

    public RegisteredPlayer(PlayerId id, String name, InetSocketAddress inetSocketAddress, String secret) {
        super(name, inetSocketAddress);
        this.id = id;
        this.secret = secret;
    }

    public PlayerId getId() {
        return id;
    }

    public String getSecret() {
        return secret;
    }

    public URI getHealthEndpoint() {
        return URI.create("http://%s:%d/status/health".formatted(getInetSocketAddress().getHostString(), getInetSocketAddress().getPort()));
    }

    public HealthStatus getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(HealthStatus healthStatus) {
        this.healthStatus = healthStatus;
    }
}
