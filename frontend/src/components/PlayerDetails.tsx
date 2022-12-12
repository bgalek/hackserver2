import {
    Avatar,
    Badge,
    Button,
    Center,
    Container,
    Paper,
    Table,
    Text,
    Title,
} from "@mantine/core";
import React from "react";
import { RegisteredPlayer } from "../types/RegisteredPlayer";
import { HealthIndicator } from "./HealthIndicator";

export function PlayerDetails({ player }: { player: RegisteredPlayer }) {
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
                <HealthIndicator status={player.status} />
            </Center>
            <Title mt={30}>Your progress</Title>
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
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                        <tr>
                            <td>Calculator</td>
                            <td>bbb</td>
                            <td>ccc</td>
                            <td><Button>RUN</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Paper>
            <Title mt={30}>Requests log</Title>
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
                        <tr>
                            <td><a href="#">Calculator</a></td>
                            <td>2+2</td>
                            <td>4</td>
                            <td>NO</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><a href="#">Calculator</a></td>
                            <td>2+2</td>
                            <td>4</td>
                            <td>NO</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><a href="#">Calculator</a></td>
                            <td>2+2</td>
                            <td>4</td>
                            <td>NO</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><a href="#">Calculator</a></td>
                            <td>2+2</td>
                            <td>4</td>
                            <td>NO</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </Table>
            </Paper>
        </Container>
    );
}
