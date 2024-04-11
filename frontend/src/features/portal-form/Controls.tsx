import { Button } from "@mantine/core";

export function NextButton({
  onNext,
  isSubmit,
}: {
  onNext: () => void;
  isSubmit: boolean;
}) {
  if (isSubmit) {
    return <Button type="submit">Submit</Button>;
  }
  return <Button onClick={onNext}>Next</Button>;
}

export function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <Button variant="light" onClick={onBack}>
      Back
    </Button>
  );
}
