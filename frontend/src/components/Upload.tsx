import {
  FileInput,
  FileInputProps,
  Loader,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IconFileAlert, IconFileCheck, IconUpload } from "@tabler/icons-react";
import { useMemo } from "react";
import { isErrorWithData } from "../common/helpers";

type FileUploadProps = FileInputProps & {
  status?: "idle" | "loading" | "success" | "error";
  errorResponse?: FetchBaseQueryError | SerializedError;
  ref?: React.ForwardedRef<HTMLButtonElement>;
};

export function FileUpload({
  status,
  errorResponse,
  ...props
}: FileUploadProps) {
  const errorMessage = useMemo(() => {
    if (!errorResponse) {
      return "";
    }
    if (!isErrorWithData(errorResponse)) {
      return "An error occurred";
    }
    return errorResponse.data.detail;
  }, [errorResponse]);

  const icon = useMemo(() => {
    if (status === "loading") {
      return <Loader size={"sm"} />;
    }
    if (status === "success") {
      return (
        <ThemeIcon
          variant="outline"
          style={{ border: "none" }}
          radius={"xl"}
          color="brandGreen.5"
          size={"sm"}
        >
          <IconFileCheck />
        </ThemeIcon>
      );
    }
    if (status === "error") {
      return (
        <ThemeIcon
          variant="outline"
          style={{ border: "none" }}
          radius={"xl"}
          color="red"
          size={"sm"}
        >
          <IconFileAlert />
        </ThemeIcon>
      );
    }
    return null;
  }, [status]);

  return (
    <FileInput
      w="20rem"
      icon={icon}
      rightSection={
        <ThemeIcon
          variant="outline"
          style={{ border: "none" }}
          color="brandDark.1"
        >
          <IconUpload size={rem(14)} />
        </ThemeIcon>
      }
      error={errorMessage}
      size="md"
      {...props}
    />
  );
}
