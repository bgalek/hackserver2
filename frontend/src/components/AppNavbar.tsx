import React, { useState } from "react";
import { Code, createStyles, Group, Navbar, Title } from "@mantine/core";
import {
    IconCpu,
    IconDatabaseImport,
    IconLogout,
    IconReceipt2,
    IconUser,
} from "@tabler/icons";
import { useRouter } from "@tanstack/react-router";
import { useLocalUserSettings } from "@bgalek/react-contexts";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    const primaryColor =
        theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
        }).background || theme.primaryColor;
    return {
        navbar: {
            backgroundColor: theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
            }).background,
            boxShadow: theme.shadows.sm,
        },

        version: {
            backgroundColor: theme.fn.lighten(primaryColor, 0.1),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(primaryColor, 0.1)}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(primaryColor, 0.1)}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor: theme.fn.lighten(primaryColor, 0.1),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.fn.lighten(primaryColor, 0.15),
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
        logo: {
            fontFamily: "'Comfortaa', cursive",
            fontSize: theme.fontSizes.md,
        },
    };
});

const data = [
    { link: "/", label: "My profile", icon: IconUser },
    { link: "/players", label: "Players", icon: IconUser },
    { link: "/challenges", label: "Challanges", icon: IconDatabaseImport },
    { link: "/about", label: "About", icon: IconReceipt2 },
];

export function AppNavbar() {
    const { classes, cx } = useStyles();
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
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Group>
                        <IconCpu />
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
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}
