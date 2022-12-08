import React from "react";
import { Alert, Button, Container, Paper, Table, Text, Title, } from "@mantine/core";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore, registeredPlayerConverter } from "../firebase";
import { IconAlertCircle } from "@tabler/icons";
import { openModal } from "@mantine/modals";
import { RegisteredPlayer } from "../types/RegisteredPlayer";
import { PlayerDetails } from "../components/PlayerDetails";
import Loading from "./Loading";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../types/AppSettings";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";

export default function Players() {
    const { settings } = useLocalUserSettings<AppSettings>();
    const ref = query(
        collection(firestore, "players"),
        orderBy("name")
    ).withConverter(registeredPlayerConverter);
    const {
        data: players,
        isLoading,
        isError,
        error,
    } = useFirestoreQuery<RegisteredPlayer>(["players"], ref, {
        subscribe: true,
    });

    const kickPlayer = useMutation({
        mutationFn: (variables: { playerId: string }) =>
            fetch(`/api/players/${variables.playerId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${settings.admin?.secret}`
                },
                method: "DELETE"
            })
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response;
                })
                .then((response) => response.json())
                .catch((error) =>
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: error.message || "",
                    })
                ),
    });


    if (isLoading) return <Loading/>;
    if (isError || !players) {
        return (
            <Alert
                icon={<IconAlertCircle size={16}/>}
                title="Bummer!"
                color="red"
            >
                {error ? error.message : "internal error"}
            </Alert>
        );
    }

    const rows = players.docs
        .map((it) => it.data())
        .map((player) => {
            return (
                <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.host}</td>
                    <td>{player.port}</td>
                    <td>
                        <Button
                            onClick={() => {
                                openModal({
                                    size: "55%",
                                    withCloseButton: true,
                                    children: <PlayerDetails player={player}/>,
                                });
                            }}
                        >
                            show
                        </Button>
                        <Button
                            disabled={!settings.admin}
                            onClick={() => kickPlayer.mutateAsync({playerId: player.id})}
                        >
                            kick
                        </Button>
                    </td>
                </tr>
            );
        });

    return (
        <Container size="lg" my={40}>
            <Title>Registered players</Title>
            <Text color="dimmed" size="sm" mt={5}>
                {rows.length} players
            </Text>
            <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host</th>
                        <th>Port</th>
                        <th>Profile</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </Container>
    );
}
