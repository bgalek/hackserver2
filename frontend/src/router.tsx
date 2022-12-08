import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell, MantineTheme } from "@mantine/core";
import { AppNavbar } from "./components/AppNavbar/AppNavbar";
import React from "react";
import About from "./views/About";
import { PlayerRegistration } from "./views/Player/PlayerRegistration";
import Challenges from "./views/Challenges";
import Players from "./views/Players";
import { CurrentPlayerDetails } from "./views/Player/CurrentPlayerDetails";
import { AdminLogin } from "./views/Admin/AdminLogin";

const styles = (theme: MantineTheme) => ({
    main: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[0],
    },
});

function Layout() {
    return (
        <AppShell navbar={<AppNavbar />} styles={styles}>
            <Outlet />
        </AppShell>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <p>index</p>,
            },
            {
                path: "/players",
                element: <Players />,
            },
            {
                path: "/player",
                element: <CurrentPlayerDetails />,
            },
            {
                path: "/players/sign-up",
                element: <PlayerRegistration />,
            },
            {
                path: "/challenges",
                element: <Challenges />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/admin",
                element: <AdminLogin />,
            },
        ],
    },
]);
