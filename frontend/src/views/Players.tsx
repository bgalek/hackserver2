import React from "react";
import {
    Alert,
    Container,
    Loader,
    Paper,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { IconAlertCircle } from "@tabler/icons";

export default function Players() {
    const [snapshot, loading, error] = useCollection(
        query(collection(firestore, "players"), orderBy("name"))
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
        <Container size="lg" my={40}>
            <Title>Registered players</Title>
            <Text color="dimmed" size="sm" mt={5}>
                {(rows || []).length} players
            </Text>
            <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Host</th>
                            <th>Port</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </Container>
    );
}
