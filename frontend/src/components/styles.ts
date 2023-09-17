import { createStyles } from "@mantine/core";

export const useTextStyles = createStyles((theme) => ({
    mobileTitle: {
        [theme.fn.smallerThan('md')]: {
            fontSize:  "1.5rem",
        },
    }
}))