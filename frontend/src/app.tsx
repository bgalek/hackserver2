import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createReactRouter, createRouteConfig, Outlet, RouterProvider, } from "@tanstack/react-router";
import Players from "./views/Players";
import About from "./views/About";
import React from "react";
import { AppShell, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { AppNavbar } from "./components/AppNavbar/AppNavbar";
import { MyProfile } from "./views/Profile/MyProfile";
import Challenges from "./views/Challenges";
import { UserSettingsProvider } from "@bgalek/react-contexts";
import { NotificationsProvider } from '@mantine/notifications';

const queryClient = new QueryClient();
const routeConfig = createRouteConfig().addChildren([
    createRouteConfig().createRoute({ path: "/", component: MyProfile }),
    createRouteConfig().createRoute({ path: "/players", component: Players }),
    createRouteConfig().createRoute({
        path: "/challenges",
        component: Challenges,
    }),
    createRouteConfig().createRoute({ path: "/about", component: About }),
]);
const router = createReactRouter({ routeConfig, defaultPreload: "intent" });

const appTheme: MantineThemeOverride = {
    colorScheme: "light",
    primaryColor: "orange",
    primaryShade: { light: 8, dark: 8 },
};

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
            <NotificationsProvider>
                <UserSettingsProvider
                    initialState={{ initialState: { loading: true } }}
                    settingsKey="hackserver.settings"
                    version="1"
                >
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router}>
                            <AppShell
                                navbar={<AppNavbar/>}
                                styles={(theme) => ({
                                    main: {
                                        backgroundColor:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.dark[4]
                                                : theme.colors.gray[0],
                                    },
                                })}
                            >
                                <Outlet/>
                            </AppShell>
                        </RouterProvider>
                    </QueryClientProvider>
                </UserSettingsProvider>
            </NotificationsProvider>
        </MantineProvider>
    );
}
