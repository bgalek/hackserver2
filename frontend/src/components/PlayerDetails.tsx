import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Center,
    Container,
    CopyButton,
    Group,
    Paper,
    Table,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import React from "react";
import {HealthIndicator} from "./HealthIndicator";
import {RegisteredPlayer} from "../types/RegisteredPlayer";
import Loading from "../views/Loading";
import {LogEntry} from "../types/LogEntry";
import {PublishedChallenge} from "../types/PublishedChallenge";
import {UseQueryResult} from "react-query";
import {FirestoreError} from "firebase/firestore";
import {IconCheck, IconCopy} from "@tabler/icons-react";

export function PlayerDetails({player, logs, challenges}: {
    player: RegisteredPlayer,
    logs?: UseQueryResult<LogEntry[], FirestoreError>,
    challenges?: UseQueryResult<PublishedChallenge[], FirestoreError>
}) {
    return (
        <Container size="lg" my={40}>
            <Avatar
                sx={(theme) => ({background: theme.primaryColor})}
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
            <Group position="center" spacing={0}>
                <Text align="center" color="dimmed">
                    id:<Badge color="red">{player.id}</Badge>
                </Text>
                <CopyButton value={player.id} timeout={2000}>
                    {({copied, copy}) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                            <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                {copied ? <IconCheck size="1rem"/> : <IconCopy size="1rem"/>}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Group>
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

function PlayerChallengesTable({challenges}: { challenges: UseQueryResult<PublishedChallenge[], FirestoreError> }) {
    if (challenges.isLoading) {
        return <Loading/>;
    }
    if (challenges.error) {
        return <p>error fetching logs</p>;
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
