import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { UserSettingsProvider } from "@bgalek/react-contexts";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ModalsProvider } from "@mantine/modals";
import { IScoutAction, IScoutSectionAction, ScoutBar } from "scoutbar";

const queryClient = new QueryClient();

const appTheme: MantineThemeOverride = {
    colorScheme: "light",
    primaryColor: "orange",
    primaryShade: { light: 8, dark: 8 },
};

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
            <NotificationsProvider>
                <ModalsProvider>
                    <UserSettingsProvider
                        initialState={{ player: {} }}
                        settingsKey="hackserver.settings"
                        version="1"
                    >
                        <QueryClientProvider client={queryClient}>
                            <RouterProvider router={router} />
                            <ScoutBar
                                actions={({
                                    createScoutAction,
                                }: {
                                    createScoutAction: (
                                        action: IScoutAction
                                    ) => IScoutAction;
                                    createScoutSection: (
                                        action: IScoutSectionAction
                                    ) => IScoutSectionAction;
                                    createScoutPage: (
                                        action: IScoutSectionAction
                                    ) => IScoutSectionAction;
                                }) => {
                                    return [
                                        createScoutAction({
                                            label: "Challenges",
                                            description: "See challenges",
                                            href: "/challenges",
                                        }),
                                        createScoutAction({
                                            label: "Admin",
                                            description: "Admin",
                                            href: "/admin",
                                        }),
                                    ];
                                }}
                            />
                            <ReactQueryDevtools position="bottom-right" />
                        </QueryClientProvider>
                    </UserSettingsProvider>
                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
    );
}
