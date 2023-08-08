import { Text, Tooltip } from "@mantine/core";

interface FormLableProps {
  labelText: string;
  toolTipText?: string;
}

export function FormLabel({ labelText, toolTipText }: FormLableProps) {
  return (
    <>
      {toolTipText ? (
        <Tooltip label={toolTipText}>
          <div>{labelText}</div>
        </Tooltip>
      ) : (
        <Text>labelText</Text>
      )}
    </>
  );
}
