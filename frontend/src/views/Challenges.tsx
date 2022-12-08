import { collection, query } from "firebase/firestore";
import { firestore, publishedChallengeConverter } from "../firebase";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import Loading from "./Loading";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { PublishedChallenge } from "../types/PublishedChallenge";

export default function Challenges() {
    const ref = query(collection(firestore, "challenges")).withConverter(
        publishedChallengeConverter
    );
    const {
        data: challenges,
        isLoading,
        isError,
        error,
    } = useFirestoreQuery<PublishedChallenge>(["challenges"], ref, {
        subscribe: true,
    });

    if (isLoading) return <Loading />;
    if (isError || !challenges) {
        return (
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="Bummer!"
                color="red"
            >
                {error ? error.message : "internal error"}
            </Alert>
        );
    }

    const rows = challenges.docs
        .map((it) => it.data())
        .map((challenge) => {
            return (
                <tr key={challenge.id}>
                    <td>{challenge.name}</td>
                </tr>
            );
        });

    return (
        <div>
            <p>{JSON.stringify(rows)}</p>
        </div>
    );
}
