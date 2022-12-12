import { Button, Container, Paper, PasswordInput, Text, Title, } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../../types/AppSettings";
import { useAdminLogin } from "../../hooks/mutations";

interface FormValues {
    password: string;
}

export function AdminLogin() {
    const { setSettings } = useLocalUserSettings<AppSettings>();
    const adminLogin = useAdminLogin();
    const form = useForm<FormValues>({
        initialValues: {
            password: "",
        },
    });
    return (
        <Container size="lg" my={40}>
            <Title align="center">Administration!</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                All your base are belong to us
            </Text>
            <Paper
                component="form"
                onSubmit={form.onSubmit((values) => adminLogin.mutateAsync(values).then(secret => setSettings("admin", { secret })))}
                withBorder
                shadow="sm"
                p={30}
                mt={30}
                radius="md"
            >
                <PasswordInput
                    label="Admin password"
                    placeholder="It seems someone had planted explosives."
                    {...form.getInputProps("password")}
                    required
                />
                <Button fullWidth mt="xl" type="submit">
                    Login
                </Button>
            </Paper>
        </Container>
    );
}
