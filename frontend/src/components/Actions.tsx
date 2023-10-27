import { Button } from "@mantine/core";

export function PrimaryButton({ children }: { children: string }) {
  return <Button radius={"md"}>{children}</Button>;
}

export function ActionButton({ children }: { children: string }) {
  return (
    <Button variant="outline" radius={"lg"}>
      {children}
    </Button>
  );
}
