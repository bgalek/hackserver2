import React from "react";
import { Badge, Box } from "@mantine/core";
import { IconBug, IconCheck, IconSkull } from "@tabler/icons";
import { HealthStatus } from "../types/RegisteredPlayer";

const skull = (
    <Box sx={{ paddingTop: 4 }}>
        <IconSkull size={16} />
    </Box>
);

const check = (
    <Box sx={{ paddingTop: 4 }}>
        <IconCheck size={16} />
    </Box>
);

const bug = (
    <Box sx={{ paddingTop: 4 }}>
        <IconBug size={16} />
    </Box>
);

export function HealthIndicator({ status }: { status: HealthStatus }) {
    switch (status) {
        case "DEAD":
            return (
                <Badge
                    leftSection={skull}
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
                    leftSection={check}
                    color="green"
                    variant="filled"
                    size="lg"
                >
                    HEALTHY
                </Badge>
            );
        case "UNKNOWN":
            return (
                <Badge leftSection={bug} color="red" variant="filled" size="lg">
                    UNKNOWN
                </Badge>
            );
    }
}
