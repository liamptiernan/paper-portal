import {
  Box,
  CloseButton,
  ColorSwatch,
  MultiSelectValueProps,
  rem,
} from "@mantine/core";

export function ColorSelectValue({
  value,
  label,
  onRemove,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
        })}
      >
        <Box mr={10}>
          <ColorSwatch color={value} size={"1rem"} />
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}
