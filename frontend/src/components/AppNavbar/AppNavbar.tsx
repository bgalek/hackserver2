import React from "react";
import { Code, Group, Navbar, Title } from "@mantine/core";
import { IconDatabaseImport, IconDeviceGamepad2, IconLogout, IconReceipt2, IconUser, } from "@tabler/icons";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { useAppBarStyles } from "./AppNavbar.styles";
import { NavLink, useNavigate } from "react-router-dom";
import { AppSettings } from "../../types/AppSettings";

export function AppNavbar() {
    const { classes, cx } = useAppBarStyles();
    const { settings, clearSettings } = useLocalUserSettings<AppSettings>();
    const navigate = useNavigate();

    const menuItems = [];

    if (settings.admin?.secret) {
        menuItems.push({
            link: `/admin`,
            label: "Admin",
            icon: IconUser,
        })
    } else if (settings.player.id) {
        menuItems.push({
            link: `/me`,
            label: "My profile",
            icon: IconUser,
        });
    } else {
        menuItems.push({
            link: "/sign-up",
            label: "Register",
            icon: IconUser,
        });
    }

    menuItems.push(
        { link: "/players", label: "Players", icon: IconUser },
        { link: "/challenges", label: "Challanges", icon: IconDatabaseImport },
        { link: "/leaderboard", label: "Leaderboard", icon: IconDatabaseImport },
        { link: "/about", label: "About", icon: IconReceipt2 }
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
                        <IconDeviceGamepad2/>
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
