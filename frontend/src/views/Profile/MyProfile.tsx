import {
    Avatar,
    Badge,
    Container,
    Paper,
    Table,
    Text,
    Title,
} from "@mantine/core";
import React from "react";
import { Registration } from "./Registration";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../../types/AppSettings";

export function MyProfile() {
    const { settings, setSettings } = useLocalUserSettings<AppSettings>();

    if (!settings.player) {
        return (
            <Registration
                onRegistration={(player) => setSettings("player", player)}
            />
        );
    }

    return (
        <Container size="lg" my={40}>
            <Avatar
                src={`https://avatars.dicebear.com/api/male/${settings.player.id}.svg`}
                size={120}
                radius={120}
                mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
                {settings.player.name}
            </Text>
            <Text align="center" color="dimmed" size="sm">
                http://{settings.player.host}:{settings.player.port}
            </Text>
            <Text align="center" color="dimmed">
                secret:<Badge color="red">{settings.player.secret}</Badge>
            </Text>
            <Title mt={30}>Your progress</Title>
            <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
                <Table>
                    <thead>
                        <tr>
                            <th>Challange</th>
                            <th>Score</th>
                            <th>Result</th>
                            <th>Anything</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>aaa</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td>ddd</td>
                        </tr>
                    </tbody>
                </Table>
            </Paper>
            <Title mt={30}>Requests log</Title>
            <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
                <Table>
                    <thead>
                        <tr>
                            <th>Challange</th>
                            <th>Score</th>
                            <th>Result</th>
                            <th>Anything</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>aaa</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td>ddd</td>
                        </tr>
                    </tbody>
                </Table>
            </Paper>
        </Container>
    );
}
