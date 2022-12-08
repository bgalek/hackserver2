package com.github.bgalek.hackserver.application.player.api;

import org.springframework.http.HttpStatusCode;

public enum HealthStatus {
    UNKNOWN, HEALTHY, DEAD;

    public static HealthStatus fromHttpStatus(HttpStatusCode httpStatusCode) {
        if (httpStatusCode == null) return DEAD;
        if (httpStatusCode.is2xxSuccessful()) return HEALTHY;
        return DEAD;
    }
}
