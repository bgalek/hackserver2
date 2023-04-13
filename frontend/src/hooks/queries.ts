import {
    collection,
    DocumentData,
    documentId,
    FirestoreDataConverter,
    query,
    QueryDocumentSnapshot,
    SnapshotOptions,
    where,
    WithFieldValue
} from "firebase/firestore";
import {firestore} from "../firebase";
import {useFirestoreQuery} from "@react-query-firebase/firestore";
import {RegisteredPlayer} from "../types/RegisteredPlayer";
import {PublishedChallenge} from "../types/PublishedChallenge";
import {LogEntry} from "../types/LogEntry";

export function usePlayer(playerId: string) {
    return useFirestoreQuery(
        ["players", playerId],
        query(
            collection(firestore, "players"),
            where(documentId(), "==", playerId)
        ).withConverter(registeredPlayerConverter),
        {subscribe: true}, {
            select(snapshot) {
                return snapshot.docs[0].data()
            },
        }
    );
}

export function usePlayers() {
    return useFirestoreQuery(
        ["players"],
        query(collection(firestore, "players")).withConverter(registeredPlayerConverter),
        {subscribe: true}, {
            select(snapshot) {
                return snapshot.docs.map(it => it.data());
            },
        }
    );
}

export function usePlayerLogs(playerId: string) {
    return useFirestoreQuery(["logs"], query(
        collection(firestore, "logs"),
        where("playerId", "==", playerId)
    ).withConverter(logEntryConverter), {
        subscribe: true,
    }, {
        select(snapshot) {
            return snapshot.docs.map(it => it.data());
        },
    });
}

export function useChallenges() {
    const ref = query(collection(firestore, "challenges")).withConverter(publishedChallengeConverter);
    return useFirestoreQuery(["challenges"], ref, {
        subscribe: true,
    }, {
        select(snapshot) {
            return snapshot.docs.map(it => it.data());
        },
    });
}


const registeredPlayerConverter: FirestoreDataConverter<RegisteredPlayer> =
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

const publishedChallengeConverter: FirestoreDataConverter<PublishedChallenge> =
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
                description: data.description,
                thumbnail: data.thumbnail
            };
        },
    };

const logEntryConverter: FirestoreDataConverter<LogEntry> =
    {
        toFirestore(logEntry: WithFieldValue<LogEntry>): DocumentData {
            return logEntry;
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): LogEntry {
            const data = snapshot.data(options);
            return {
                id: snapshot.id,
                playerId: data.playerId,
                challengeId: data.challengeId
            };
        },
    };