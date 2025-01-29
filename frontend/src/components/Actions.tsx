import { Button, ButtonProps } from "@mantine/core";

export function PrimaryButton(
  props: ButtonProps & { onClick?: () => void; isLoading?: boolean }
) {
  return (
    <Button radius={"md"} {...props}>
      {props.children}
    </Button>
  );
}

export function ActionButton(
  props: ButtonProps & { onClick?: () => void; isLoading?: boolean }
) {
  return (
    <Button variant="outline" radius={"lg"} {...props}>
      {props.children}
    </Button>
  );
}
