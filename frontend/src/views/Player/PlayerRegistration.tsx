import {
    Button,
    Container,
    NumberInput,
    Paper,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../../types/AppSettings";
import { useNavigate } from "react-router-dom";

interface FormValues {
    name: string;
    host: string;
    port: number;
}

export function PlayerRegistration() {
    const { setSettings } = useLocalUserSettings<AppSettings>();
    const navigate = useNavigate();
    const registration = useMutation({
        mutationFn: (variables: FormValues) =>
            fetch("/api/players", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(variables),
            })
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response;
                })
                .then((response) => response.json())
                .then((player) => {
                    setSettings("player", {
                        id: player.id,
                        secret: player.secret,
                    });
                    navigate(`/player`);
                })
                .catch((error) =>
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: error.message || "",
                    })
                ),
    });
    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            host: "",
            port: 8080,
        },
    });
    return (
        <Container size="lg" my={40}>
            <Title align="center">Welcome!</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Please <Text component="span">register</Text> your workstation
            </Text>
            <Paper
                component="form"
                onSubmit={form.onSubmit((values) => {
                    registration.mutateAsync(values);
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
