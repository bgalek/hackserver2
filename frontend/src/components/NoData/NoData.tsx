import React from "react";
import img from "./undraw_no_data_re_kwbl.svg";
import errorImg from "./undraw_no_data_re_kwbl.svg";
import {Box, Center, Stack, Text} from "@mantine/core";

export default function NoData() {
    return (
        <Center style={{height: '100%'}}>
            <Stack justify="space-around">
                <Box p="lg">
                    <img style={{maxHeight: 350}} src={errorImg} alt="Page not found"/>
                </Box>
                <Text align="center">No data</Text>
            </Stack>
        </Center>
    );
}
