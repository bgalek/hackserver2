package com.github.bgalek.hackserver.infrastructure;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.github.bgalek.hackserver.infrastructure.FirebaseConfiguration.FirebaseConfigurationProperties;

@Configuration
@EnableConfigurationProperties(FirebaseConfigurationProperties.class)
class FirebaseConfiguration {

    @Bean
    @ConditionalOnProperty(prefix = "app.firebase", value = "type", havingValue = "emulator")
    Firestore localFirestore(FirebaseConfigurationProperties firebaseConfigurationProperties) {
        return FirestoreOptions.newBuilder()
                .setCredentials(GoogleCredentials.newBuilder().build())
                .setProjectId(firebaseConfigurationProperties.projectId)
                .setEmulatorHost("localhost:%s".formatted(9090))
                .build()
                .getService();
    }

    @ConfigurationProperties(prefix = "app.firebase")
    record FirebaseConfigurationProperties(
            String projectId,
            String type
    ) {
    }
}
