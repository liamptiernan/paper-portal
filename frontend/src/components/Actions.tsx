import { Button, ButtonProps } from "@mantine/core";

export function PrimaryButton(props: ButtonProps) {
  return (
    <Button radius={"md"} {...props}>
      {props.children}
    </Button>
  );
}

export function ActionButton(props: ButtonProps & JSX.IntrinsicAttributes) {
  return (
    <Button variant="outline" radius={"lg"} {...props}>
      {props.children}
    </Button>
  );
}
