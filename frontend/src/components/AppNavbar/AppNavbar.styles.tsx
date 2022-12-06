import { createStyles } from "@mantine/core";

export const useAppBarStyles = createStyles((theme, _params, getRef) => {
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
