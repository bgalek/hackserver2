import { initializeApp } from "firebase/app";
import {
    connectFirestoreEmulator,
    DocumentData,
    FirestoreDataConverter,
    getFirestore,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { RegisteredPlayer } from "./types/RegisteredPlayer";
import { PublishedChallenge } from "./types/PublishedChallenge";

const firebase = initializeApp({
    apiKey: "AIzaSyA0tgztbEzTBlUjNXiTcs82S0q87Odbo4M",
    authDomain: "hackserver-9c717.firebaseapp.com",
    projectId: "hackserver-9c717",
    storageBucket: "hackserver-9c717.appspot.com",
    messagingSenderId: "936311458867",
    appId: "1:936311458867:web:15ea2795016223523ee746",
});

export const firestore = getFirestore(firebase);

if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 9090);
}

export const registeredPlayerConverter: FirestoreDataConverter<RegisteredPlayer> =
    {
        toFirestore(player: WithFieldValue<RegisteredPlayer>): DocumentData {
            return player;
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): RegisteredPlayer {
            const data = snapshot.data(options);
            return {
                id: snapshot.id,
                name: data.name,
                host: data.host,
                port: data.port,
                secret: data.secret,
                status: data.status,
            };
        },
    };

export const publishedChallengeConverter: FirestoreDataConverter<PublishedChallenge> =
    {
        toFirestore(player: WithFieldValue<PublishedChallenge>): DocumentData {
            return player;
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): PublishedChallenge {
            const data = snapshot.data(options);
            return {
                id: snapshot.id,
                name: data.name,
                thumbnail: data.thumbnail
            };
        },
    };
