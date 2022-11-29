package com.github.bgalek.hackserver.infrastructure;

import com.google.cloud.firestore.DocumentSnapshot;

import java.util.Map;

public interface FirebaseRepository<T> {
    Map<String, Object> serialize(T value);

    T deserialize(DocumentSnapshot doc);
}
