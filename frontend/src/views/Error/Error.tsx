import React from "react";
import errorImg from "./undraw_fixing_bugs_w7gi.svg";
import {Box, Center, Container, Stack, Text, Title} from "@mantine/core";

export default function Error() {
    return (
        <Container p="lg" style={{height: '100%'}}>
            <Center style={{height: '100%'}}>
                <Stack justify="space-around">
                    <Box p="lg">
                        <img style={{maxHeight: 350}} src={errorImg} alt="Huston, we have a problem"/>
                    </Box>
                    <Title align="center" order={1}>We have a problem</Title>
                    <Text align="center">Something went wrong. Please try again later.</Text>
                </Stack>
            </Center>

        </Container>
    );
}
