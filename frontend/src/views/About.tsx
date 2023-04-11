import React from "react";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../types/AppSettings";
import {Container, Text, Title} from "@mantine/core";

export default function About() {
    const { settings } = useLocalUserSettings<AppSettings>();
    return (
        <Container size="lg" mb={40}>
            <Title>About</Title>
            <Text color="dimmed" size="sm" mt={5}>
                This is a simple app to hack on.
            </Text>
            <p>{JSON.stringify(settings)}</p>
        </Container>
    );
}
