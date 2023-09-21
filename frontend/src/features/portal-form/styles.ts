import { createStyles } from "@mantine/core";

export const useGeneralStyles = createStyles((theme) => ({
    hideMobile: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    }
}))

export const useNavBarStyles = createStyles((theme) => ({
    navContainer: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #ccc",
        marginBottom: "2rem",
        [theme.fn.smallerThan('md')]: {
            marginBottom: ".5rem",

        }
    }
}))

export const usePurchaseViewerStyles = createStyles((theme) => ({
    viewerContainer: {
        marginTop: "1.25rem",
        [theme.fn.smallerThan('md')]: {
            marginTop: 0
        }
    }
}))

export const useFormSectionStyles = createStyles((theme) => ({
    sectionPaper: {
        padding: "1.25rem",
        [theme.fn.smallerThan('md')]: {
            padding: ".25rem"
        }
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
