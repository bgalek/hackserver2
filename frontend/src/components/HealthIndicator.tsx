import React from "react";
import { Badge, Box } from "@mantine/core";
import { IconBug, IconCheck } from "@tabler/icons";
import { HealthStatus } from "../types/RegisteredPlayer";

export function HealthIndicator({ status }: { status: HealthStatus }) {
    switch (status) {
        case "DEAD":
            return (
                <Badge
                    leftSection={<SkullIcon/>}
                    color="yellow"
                    variant="filled"
                    size="lg"
                >
                    DEAD
                </Badge>
            );
        case "HEALTHY":
            return (
                <Badge
                    leftSection={<CheckIcon/>}
                    color="green"
                    variant="filled"
                    size="lg"
                >
                    HEALTHY
                </Badge>
            );
        default:
            return (
                <Badge leftSection={<BugIcon/>} color="red" variant="filled" size="lg">
                    UNKNOWN
                </Badge>
            );
    }
}

function SkullIcon() {
    return (
        <Box sx={{ paddingTop: 4 }}>
            <IconBug size={16}/>
        </Box>
    );
}

function CheckIcon() {
    return (
        <Box sx={{ paddingTop: 4 }}>
            <IconCheck size={16}/>
        </Box>
    );
}

function BugIcon() {
    return (
        <Box sx={{ paddingTop: 4 }}>
            <IconBug size={16}/>
        </Box>
    );
}