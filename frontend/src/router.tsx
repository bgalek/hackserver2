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
import Error from "./views/Error/Error";
import { CommandPalette } from "./components/CommandPalette";
import NotFound from "./views/Error/NotFound";

const styles = (theme: MantineTheme) => ({
    main: {
        height: '100%',
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
                path: '*',
                element: <NotFound/>,
            },
            {
                path: routes.CURRENT_PLAYER,
                errorElement: <Error />,
                element: <CurrentPlayerDetails/>,
            },

            {
                path: routes.PLAYER_SIGN_UP,
                errorElement: <Error />,
                element: <PlayerRegistration/>,
            },
            {
                path: routes.PLAYERS_LIST,
                errorElement: <Error />,
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
                errorElement: <Error />,
                element: <Challenges/>,
            },
            {
                path: routes.ABOUT,
                errorElement: <Error />,
                element: <About/>,
            },
            {
                path: routes.ADMIN,
                errorElement: <Error />,
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
