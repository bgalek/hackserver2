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
import { CommandPalette } from "./components/CommandPalette";

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
        <AppShell navbar={<AppNavbar/>} styles={styles}>
            <Outlet/>
            <CommandPalette/>
        </AppShell>
    );
}

export const routes = {
    CURRENT_PLAYER: "/me",
    CHALLENGES_LIST: "/challenges",
    ABOUT: "/about",
    PLAYER_SIGN_UP: "/sign-up",
    PLAYERS_LIST: "/players",
    ADMIN: "/admin",
    ADMIN_SIGN_UP: "/admin/sign-up",
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <p>index</p>,
            },
            {
                path: routes.CURRENT_PLAYER,
                element: <CurrentPlayerDetails/>,
            },

            {
                path: routes.PLAYER_SIGN_UP,
                element: <PlayerRegistration/>,
            },
            {
                path: routes.PLAYERS_LIST,
                children: [
                    {
                        path: "",
                        index: true,
                        element: <Players/>
                    }
                ]
            },
            {
                path: routes.CHALLENGES_LIST,
                element: <Challenges/>,
            },
            {
                path: routes.ABOUT,
                element: <About/>,
            },
            {
                path: routes.ADMIN,
                children: [
                    {
                        path: "sign-up",
                        element: <AdminLogin/>,
                    }
                ]
            }
        ],
    },
]);
