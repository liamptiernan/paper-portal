import { createStyles } from "@mantine/core";

export const useGeneralStyles = createStyles((theme) => ({
    hideMobile: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    }
}))

export const useBorderButtonStyles = createStyles((theme) => ({
    backButton: {
        height: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },
    nextButtonContainer: {
        height: "calc(100vh - 200px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.fn.smallerThan('md')]: {
            height: '50px',
        },
    },
    nextButton: {
        height: "calc(100vh - 500px)",
        borderRadius: "400px",
        transition: "300ms",
        [theme.fn.smallerThan('md')]: {
            height: '50px',
        },
    }
}))
