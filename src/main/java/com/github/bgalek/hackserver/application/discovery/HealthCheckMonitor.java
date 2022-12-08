package com.github.bgalek.hackserver.application.discovery;

import com.github.bgalek.hackserver.application.player.PlayerCommand;
import com.github.bgalek.hackserver.application.player.PlayerQuery;
import com.github.bgalek.hackserver.application.player.api.HealthStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

public class HealthCheckMonitor {
    private static final Logger logger = LoggerFactory.getLogger(HealthCheckMonitor.class);
    private final PlayerQuery playerQuery;
    private final PlayerCommand playerCommand;
    private final RestTemplate restTemplate;

    HealthCheckMonitor(PlayerQuery playerQuery, PlayerCommand playerCommand, RestTemplate restTemplate) {
        this.playerQuery = playerQuery;
        this.playerCommand = playerCommand;
        this.restTemplate = restTemplate;
    }

    public void checkAll() {
        playerQuery.findAll().forEach(player -> CompletableFuture.runAsync(() -> {
            HttpStatusCode httpStatusCode = null;
            try {
                httpStatusCode = restTemplate.getForEntity(player.getHealthEndpoint(), Void.class).getStatusCode();
            } catch (Exception exception) {
                logger.debug("Health check failed {}, error {}", player.getHealthEndpoint(), exception.getMessage());
            } finally {
                HealthStatus healthStatus = HealthStatus.fromHttpStatus(httpStatusCode);
                if (player.getHealthStatus() == HealthStatus.UNKNOWN || player.getHealthStatus() != healthStatus) {
                    player.setHealthStatus(HealthStatus.fromHttpStatus(httpStatusCode));
                    playerCommand.updateHealth(player.getId(), healthStatus);
                }
            }
        }));
    }
}
