import React from "react";
import errorImg from "./undraw_page_not_found_re_e9o6.svg";
import {Box, Center, Container, Stack, Text} from "@mantine/core";

export default function NotFound() {
    return (
        <Container p="lg" style={{height: '100%'}}>
            <Center style={{height: '100%'}}>
                <Stack justify="space-around">
                    <Box p="lg">
                        <img style={{maxHeight: 350}} src={errorImg} alt="Page not found"/>
                    </Box>
                    <Text align="center">Page not found</Text>
                </Stack>
            </Center>

        </Container>
    );
}
