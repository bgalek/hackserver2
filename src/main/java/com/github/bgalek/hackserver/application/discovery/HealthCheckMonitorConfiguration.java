package com.github.bgalek.hackserver.application.discovery;

import com.github.bgalek.hackserver.application.player.PlayerCommand;
import com.github.bgalek.hackserver.application.player.PlayerQuery;
import org.apache.http.HttpHeaders;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
class HealthCheckMonitorConfiguration {
    @Bean
    HealthCheckMonitor healthCheckMonitor(PlayerQuery playerQuery,
                                          TaskScheduler taskScheduler,
                                          PlayerCommand playerCommand) {
        RestTemplate restTemplate = healthCheckMonitorRestTemplate();
        HealthCheckMonitor healthCheckMonitor = new HealthCheckMonitor(playerQuery, playerCommand, restTemplate);
        taskScheduler.scheduleAtFixedRate(healthCheckMonitor::checkAll, Duration.ofSeconds(5));
        return healthCheckMonitor;
    }

    private RestTemplate healthCheckMonitorRestTemplate() {
        return new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofMillis(300))
                .setReadTimeout(Duration.ofMillis(300))
                .defaultHeader(HttpHeaders.USER_AGENT, "Hackserver")
                .build();
    }
}
