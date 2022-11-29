package com.github.bgalek.hackserver.infrastructure;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
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
    Firestore firestore(FirebaseConfigurationProperties firebaseConfigurationProperties) throws IOException {
        FileInputStream serviceAccount = new FileInputStream(firebaseConfigurationProperties.keyLocation());
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
        FirebaseApp firebaseApp = FirebaseApp.initializeApp(options);
        return FirestoreClient.getFirestore(firebaseApp);
    }

    @ConfigurationProperties(prefix = "app.firebase")
    record FirebaseConfigurationProperties(
            String keyLocation,
            String env
    ) {}
}
