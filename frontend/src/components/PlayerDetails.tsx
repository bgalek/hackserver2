import {Avatar, Badge, Button, Center, Container, Paper, Table, Text, Title,} from "@mantine/core";
import React from "react";
import {HealthIndicator} from "./HealthIndicator";
import {RegisteredPlayer} from "../types/RegisteredPlayer";
import Loading from "../views/Loading";
import {LogEntry} from "../types/LogEntry";
import {PublishedChallenge} from "../types/PublishedChallenge";
import {UseQueryResult} from "react-query";
import {FirestoreError} from "firebase/firestore";

export function PlayerDetails({player, logs, challenges}: {
    player: RegisteredPlayer,
    logs?: UseQueryResult<LogEntry[], FirestoreError>,
    challenges?: UseQueryResult<PublishedChallenge[], FirestoreError>
}) {
    return (
        <Container size="lg" my={40}>
            <Avatar
                src={`https://avatars.dicebear.com/api/male/${player.id}.svg`}
                size={120}
                radius={120}
                mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
                {player.name}
            </Text>
            <Text align="center" color="dimmed" size="sm">
                http://{player.host}:{player.port}
            </Text>
            <Text align="center" color="dimmed">
                secret:<Badge color="red">{player.secret}</Badge>
            </Text>
            <Center>
                <HealthIndicator status={player.status}/>
            </Center>
            <Title mt={30}>Your progress</Title>
            {challenges && <PlayerChallengesTable challenges={challenges}/>}
            <Title mt={30}>Requests log</Title>
            {logs && <PlayerLogsTable logs={logs}/>}
        </Container>
    );
}

function PlayerChallengesTable({challenges}: { challenges: any }) {
    if (challenges.isLoading) {
        return <Loading/>;
    }
    return (
        <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
            <Table>
                <thead>
                <tr>
                    <th>Challenge</th>
                    <th>Score</th>
                    <th>Result</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Calculator</td>
                    <td>bbb</td>
                    <td>ccc</td>
                    <td><Button>EXECUTE</Button></td>
                </tr>
                </tbody>
            </Table>
        </Paper>
    );
}

function PlayerLogsTable({logs}: { logs: UseQueryResult<LogEntry[], FirestoreError> }) {
    if (logs.isLoading) {
        return <Loading/>;
    }
    if (logs.error) {
        return <p>error fetching logs</p>;
    }
    return (
        <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
            <Table>
                <thead>
                <tr>
                    <th>Challenge</th>
                    <th>Task</th>
                    <th>Response</th>
                    <th>Valid</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {(logs.data || []).map((log) => (<tr>
                        <td>Calculator</td>
                        <td>bbb</td>
                        <td>ccc</td>
                        <td>{JSON.stringify(log)}</td>
                    </tr>)
                )}
                </tbody>
            </Table>
        </Paper>
    );
}
