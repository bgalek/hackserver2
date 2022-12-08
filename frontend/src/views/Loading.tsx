import React from "react";
import { Center, Container, Loader } from "@mantine/core";

export default function Loading() {
    return (
        <Container display="grid" sx={{ height: "100%" }}>
            <Center>
                <Loader />
            </Center>
        </Container>
    );
}
