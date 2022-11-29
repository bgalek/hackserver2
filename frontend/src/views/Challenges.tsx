import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { firestore } from "../firebase";
import { Alert, Loader } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";

export default function Challenges() {
    const [snapshot, loading, error] = useCollection(
        query(collection(firestore, "challenges"))
    );

    if (loading) return <Loader />;
    if (error) {
        return (
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="Bummer!"
                color="red"
            >
                {error.message}
            </Alert>
        );
    }

    const rows = snapshot?.docs.map((snapshot) => {
        const data = snapshot.data();
        return (
            <tr key={snapshot.id}>
                <td>{data.name}</td>
                <td>{data.host}</td>
                <td>{data.port}</td>
            </tr>
        );
    });

    return (
        <div>
            <p>{JSON.stringify(rows)}</p>
        </div>
    );
}
