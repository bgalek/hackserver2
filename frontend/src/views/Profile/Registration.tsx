import { Button, Container, NumberInput, Paper, Text, TextInput, Title, } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { RegisteredPlayer } from "../../types/RegisteredPlayer";
import { showNotification } from "@mantine/notifications";

interface FormValues {
    name: string;
    host: string;
    port: number;
}

type RegistrationProps = { onRegistration: (player: RegisteredPlayer) => void };

export function Registration({ onRegistration }: RegistrationProps) {
    const registration = useMutation({
        mutationFn: (variables: FormValues) =>
            fetch("/api/players", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(variables),
            })
                .then((response) => response.json())
                .catch((error) => showNotification({
                    title: 'Error',
                    color: 'red',
                    message: error.message || "",
                }))
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
                    registration.mutateAsync(values).then(onRegistration);
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
