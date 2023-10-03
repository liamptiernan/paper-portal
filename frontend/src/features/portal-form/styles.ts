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
            marginTop: 0,
            maxWidth: "calc(100vw - 60px)"
        }
    }
}))

export const useFormSectionStyles = createStyles((theme) => ({
    sectionPaper: {
        padding: "1.25rem",
        [theme.fn.smallerThan('md')]: {
            padding: ".25rem",
            maxWidth: "calc(100vw - 100px)",
        }
    },
    sectionStack: {
        gap:"1.5rem",
        [theme.fn.smallerThan('md')]: {
            gap: "0"
        }
    }
}))

export const useMapStyles = createStyles((theme) => ({
    mapContainer: {
        width: "500px",
        height: "350px",
        [theme.fn.smallerThan('md')]: {
            width: "calc(100vw - 120px)",
            height: "200px"
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
            marginTop: ".5rem",
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
