import React, { useState } from "react";
import { Code, Group, Navbar, Title } from "@mantine/core";
import { IconDatabaseImport, IconDeviceGamepad2, IconLogout, IconReceipt2, IconUser, } from "@tabler/icons";
import { useRouter } from "@tanstack/react-router";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { useAppBarStyles } from "./AppNavbar.styles";

const data = [
    { link: "/", label: "My profile", icon: IconUser },
    { link: "/players", label: "Players", icon: IconUser },
    { link: "/challenges", label: "Challanges", icon: IconDatabaseImport },
    { link: "/about", label: "About", icon: IconReceipt2 },
];

export function AppNavbar() {
    const { classes, cx } = useAppBarStyles();
    const [active, setActive] = useState("My profile");
    const { clearSettings } = useLocalUserSettings();
    const router = useRouter();

    const links = data.map((item) => (
        <a
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                router.navigate({
                    to: item.link,
                    search: function (): never {
                        return undefined as never;
                    },
                    params: function (): never {
                        return undefined as never;
                    },
                });
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5}/>
            <span>{item.label}</span>
        </a>
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
                <a
                    href="#"
                    className={classes.link}
                    onClick={() => clearSettings()}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5}/>
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}
