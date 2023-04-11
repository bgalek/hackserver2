import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { UserSettingsProvider } from "@bgalek/react-contexts";
import { Notifications } from "@mantine/notifications";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ModalsProvider } from "@mantine/modals";
import { appTheme } from "./theme";

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
            <Notifications />
            <ModalsProvider>
                <UserSettingsProvider
                    initialState={{ player: {} }}
                    settingsKey="hackserver.settings"
                    version="1"
                >
                    <QueryClientProvider client={new QueryClient()}>
                        <RouterProvider router={router}/>
                        <ReactQueryDevtools position="bottom-right"/>
                    </QueryClientProvider>
                </UserSettingsProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}
