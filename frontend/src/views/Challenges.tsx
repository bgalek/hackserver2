import {Alert, Badge, Button, Card, Container, Group, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import React from "react";
import Loading from "./Loading";
import NoData from "../components/NoData/NoData";
import {modals} from '@mantine/modals';
import {useChallenges} from "../hooks/queries";

export default function Challenges() {
    const challenges = useChallenges();

    if (challenges.isLoading) return <Loading/>;
    if (challenges.isError || !challenges.data) {
        return (
            <Alert
                icon={<IconAlertCircle size={16}/>}
                title="Bummer!"
                color="red"
            >
                {challenges.error ? challenges.error.message : "internal error"}
            </Alert>
        );
    }

    return (
        <Container size="lg" mb={40}>
            <Title>Challenges</Title>
            <Text color="dimmed" size="sm" mt={5}>
                Browse today's challenges
            </Text>
            {challenges.data.length === 0 && <NoData/>}
            <SimpleGrid cols={3} pt="lg">
                {challenges.data.map(challenge => (
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src={challenge.thumbnail}
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>{challenge.name}</Text>
                            <Badge color="pink" variant="light">100 points</Badge>
                        </Group>
                        <Button variant="light" color="blue" fullWidth mt="md" radius="md"
                                onClick={() => {
                                    modals.open({
                                        title: `${challenge.name} details`,
                                        children: (
                                            <Stack>
                                                <Text>{challenge.description}</Text>
                                            </Stack>
                                        ),
                                    });
                                }}
                        >
                            Details
                        </Button>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
