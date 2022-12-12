import { Button, Container, NumberInput, Paper, Text, TextInput, Title, } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { usePlayerRegistration } from "../../hooks/mutations";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../../types/AppSettings";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router";

interface FormValues {
    name: string;
    host: string;
    port: number;
}

const initialValues = {
    name: "",
    host: "",
    port: 8080,
};

export function PlayerRegistration() {
    const { setSettings } = useLocalUserSettings<AppSettings>();
    const navigate = useNavigate();
    const playerRegistration = usePlayerRegistration();
    const form = useForm<FormValues>({ initialValues, });
    return (
        <Container size="lg" my={40}>
            <Title>Welcome!</Title>
            <Text color="dimmed" size="sm" mt={5}>
                Please <Text component="span">register</Text> your workstation
            </Text>
            <Paper
                component="form"
                onSubmit={form.onSubmit((values) => {
                    playerRegistration.mutateAsync(values).then((player) => {
                        setSettings("player", {
                            id: player.id,
                            secret: player.secret,
                        });
                        navigate(routes.CURRENT_PLAYER);
                    });
                })}
                withBorder
                shadow="sm"
                p={30}
                mt={30}
                radius="md"
            >
                <TextInput
                    label="Player Name"
                    placeholder="Jack Sparrow"
                    {...form.getInputProps("name")}
                    required
                />
                <TextInput
                    label="Host"
                    placeholder="192.168.1.123"
                    {...form.getInputProps("host")}
                    required
                    mt="md"
                />
                <NumberInput
                    label="Port"
                    placeholder="3000"
                    {...form.getInputProps("port")}
                    required
                    mt="md"
                />
                <Button fullWidth mt="xl" type="submit">
                    Register
                </Button>
            </Paper>
        </Container>
    );
}
