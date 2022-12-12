import { collection, query } from "firebase/firestore";
import { firestore, publishedChallengeConverter } from "../firebase";
import { Alert, Badge, Button, Card, Group, Text, Image, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import Loading from "./Loading";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { PublishedChallenge } from "../types/PublishedChallenge";

export default function Challenges() {
    const ref = query(collection(firestore, "challenges")).withConverter(publishedChallengeConverter);
    const {
        data: challenges,
        isLoading,
        isError,
        error,
    } = useFirestoreQuery<PublishedChallenge>(["challenges"], ref, {
        subscribe: true,
    });

    if (isLoading) return <Loading/>;
    if (isError || !challenges) {
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

    return (
        <Container>
            {challenges.docs.map((it) => it.data()).map(challenge => (
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src={challenge.thumbnail}
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light">
                            On Sale
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        {challenge.name}
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        Book classic tour now
                    </Button>
                </Card>
            ))}
        </Container>
    );
}
