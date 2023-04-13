import React from "react";
import {Alert, Button, Container, Paper, Table, Text, Title,} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import {openModal} from "@mantine/modals";
import {PlayerDetails} from "../components/PlayerDetails";
import Loading from "./Loading";
import {useLocalUserSettings} from "@bgalek/react-contexts";
import {AppSettings} from "../types/AppSettings";
import {useMutation} from "react-query";
import {showNotification} from "@mantine/notifications";
import NoData from "../components/NoData/NoData";
import {usePlayers} from "../hooks/queries";

export default function Players() {
    const {settings} = useLocalUserSettings<AppSettings>();
    const players = usePlayers();

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


    if (players.isLoading) return <Loading/>;
    if (players.isError || !players.data) {
        return (
            <Alert
                icon={<IconAlertCircle size={16}/>}
                title="Bummer!"
                color="red"
            >
                {players.error ? players.error.message : "internal error"}
            </Alert>
        );
    }

    const rows = players.data
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
        <Container size="lg" style={{height: '100%'}}>
            <Title>Registered players</Title>
            <Text color="dimmed" size="sm" mt={5}>
                {rows.length} players
            </Text>
            {rows.length === 0 && <NoData/>}
            {rows.length > 0 && <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
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
            </Paper>}
        </Container>
    );
}
