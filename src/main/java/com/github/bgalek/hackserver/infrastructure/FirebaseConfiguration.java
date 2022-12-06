package com.github.bgalek.hackserver.infrastructure;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.datastore.emulator.firestore.CloudFirestore;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

import static com.github.bgalek.hackserver.infrastructure.FirebaseConfiguration.FirebaseConfigurationProperties;

@Configuration
@EnableConfigurationProperties(FirebaseConfigurationProperties.class)
class FirebaseConfiguration {
    @Bean
    @ConditionalOnProperty(prefix = "app.firebase", value = "enabled", havingValue = "true")
    Firestore firestore(FirebaseConfigurationProperties firebaseConfigurationProperties) throws IOException {
        FileInputStream serviceAccount = new FileInputStream(firebaseConfigurationProperties.keyLocation());
        return FirestoreOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();
    }

    @Bean
    @ConditionalOnProperty(prefix = "app.firebase", value = "enabled", havingValue = "false")
    Firestore localFirestore() {
        int emulatorPort = 9090;
        new Thread(() -> {
            try {
                CloudFirestore.main(new String[]{"--port", String.valueOf(emulatorPort)});
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).start();
        return FirestoreOptions.newBuilder()
                .setCredentials(GoogleCredentials.newBuilder().build())
                .setProjectId("local")
                .setEmulatorHost("localhost:%s".formatted(emulatorPort))
                .build()
                .getService();
    }

    @ConfigurationProperties(prefix = "app.firebase")
    record FirebaseConfigurationProperties(
            String keyLocation,
            boolean enabled
    ) {}
}
