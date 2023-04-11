import React from "react";
import { Code, Group, Navbar, Title } from "@mantine/core";
import {
    IconAward,
    IconGolf,
    IconDeviceGamepad2,
    IconLogout,
    IconReceipt2,
    IconUser,
    IconUsers
} from "@tabler/icons-react";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { useAppBarStyles } from "./AppNavbar.styles";
import { NavLink, useNavigate } from "react-router-dom";
import { AppSettings } from "../../types/AppSettings";
import {routes} from "../../router";

export function AppNavbar() {
    const { classes, cx } = useAppBarStyles();
    const { settings, clearSettings } = useLocalUserSettings<AppSettings>();
    const navigate = useNavigate();

    const menuItems = [];

    if (settings.admin?.secret) {
        menuItems.push({
            link: routes.ADMIN,
            label: "Admin",
            icon: IconUser,
        })
    } else if (settings.player.id) {
        menuItems.push({
            link: routes.CURRENT_PLAYER,
            label: "My profile",
            icon: IconUser,
        });
    } else {
        menuItems.push({
            link: routes.PLAYER_SIGN_UP,
            label: "Register",
            icon: IconUser,
        });
    }

    menuItems.push(
        { link: routes.PLAYERS_LIST, label: "Players", icon: IconUsers },
        { link: routes.CHALLENGES_LIST, label: "Challanges", icon: IconGolf },
        { link: "/leaderboard", label: "Leaderboard", icon: IconAward },
        { link: routes.ABOUT, label: "About", icon: IconReceipt2 }
    );

    const links = menuItems.map((item) => (
        <NavLink to={item.link} key={item.label}
                 className={({ isActive }) => cx(classes.link, {
                     [classes.linkActive]: isActive,
                 })}>
            <item.icon className={classes.linkIcon} stroke={1.5}/>
            <span>{item.label}</span>
        </NavLink>
    ));

    return (
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Group>
                        <IconDeviceGamepad2 style={{color: "white"}}/>
                        <Title className={classes.logo}>HACKSERVER</Title>
                    </Group>
                    <Code className={classes.version}>
                        {APP.version.substring(0, 8)}
                    </Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {(settings.player.id || settings.admin?.secret) && (
                    <LogoutButton
                        classes={{
                            link: classes.link,
                            linkIcon: classes.linkIcon,
                        }}
                        onClick={() => {
                            clearSettings();
                            navigate("/");
                        }}
                    />
                )}
            </Navbar.Section>
        </Navbar>
    );
}

function LogoutButton({ classes, onClick }: {
    classes: { link: string; linkIcon: string };
    onClick: () => void;
}) {
    return (
        <a href="#" className={classes.link} onClick={onClick}>
            <IconLogout className={classes.linkIcon} stroke={1.5}/>
            <span>Logout</span>
        </a>
    );
}
