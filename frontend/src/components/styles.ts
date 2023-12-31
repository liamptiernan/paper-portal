import { createStyles } from "@mantine/core";

export const useTextStyles = createStyles((theme) => ({
  mobileTitle: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "1.5rem",
    },
  },
  mobileTitleLarge: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "1.75rem",
    },
  },
  mobileAlignRight: {
    [theme.fn.smallerThan("md")]: {
      textAlign: "right",
    },
  },
}));

export const useNavBarStyles = createStyles((theme) => ({
  navContainer: {
    backgroundColor: theme.colors.gray[2], // TODO: change to brand blue color
  },
}));
