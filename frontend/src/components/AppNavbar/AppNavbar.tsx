import React, { useState } from "react";
import { Code, Group, Navbar, Title } from "@mantine/core";
import {
    IconDatabaseImport,
    IconDeviceGamepad2,
    IconLogout,
    IconReceipt2,
    IconUser,
} from "@tabler/icons";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { useAppBarStyles } from "./AppNavbar.styles";
import { useNavigate } from "react-router-dom";
import { AppSettings } from "../../types/AppSettings";

export function AppNavbar() {
    const { classes, cx } = useAppBarStyles();
    const [active, setActive] = useState("My profile");
    const { settings, clearSettings } = useLocalUserSettings<AppSettings>();
    const navigate = useNavigate();

    const menuItems = [];

    if (settings.player.id) {
        menuItems.push({
            link: `/player`,
            label: "My profile",
            icon: IconUser,
        });
    } else {
        menuItems.push({
            link: "/players/sign-up",
            label: "Register",
            icon: IconUser,
        });
    }

    menuItems.push(
        { link: "/players", label: "Players", icon: IconUser },
        { link: "/challenges", label: "Challanges", icon: IconDatabaseImport },
        { link: "/about", label: "About", icon: IconReceipt2 }
    );

    const links = menuItems.map((item) => (
        <a
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                navigate(item.link);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Group>
                        <IconDeviceGamepad2 />
                        <Title className={classes.logo}>HACKSERVER</Title>
                    </Group>
                    <Code className={classes.version}>
                        {APP.version.substring(0, 8)}
                    </Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {settings.player && (
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

function LogoutButton({
    classes,
    onClick,
}: {
    classes: { link: string; linkIcon: string };
    onClick: () => void;
}) {
    return (
        <a href="#" className={classes.link} onClick={onClick}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
        </a>
    );
}
