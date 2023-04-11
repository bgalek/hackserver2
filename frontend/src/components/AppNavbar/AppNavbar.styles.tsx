import {createStyles, getStylesRef, rem} from "@mantine/core";

export const useAppBarStyles = createStyles((theme) => {
    const icon = getStylesRef("icon");
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

        adminLink: {
            backgroundColor: theme.fn.lighten(primaryColor, 0.1),
            color: theme.white,
            fontWeight: 700,
            textDecoration: "none",
        },

        version: {
            backgroundColor: theme.fn.lighten(primaryColor, 0.1),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: `calc(${theme.spacing.md} * 1.5)`,
            borderBottom: `${rem(1)} solid ${theme.fn.lighten(primaryColor, 0.2)}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `${rem(1)} solid ${theme.fn.lighten(primaryColor, 0.1)}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.white,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.fn.lighten(primaryColor, 0.1),
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                [`& .${getStylesRef('icon')}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${getStylesRef('icon')}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },

        logo: {
            color: theme.white,
            fontFamily: "'Comfortaa', cursive",
            fontSize: theme.fontSizes.md,
        },
    };
});
