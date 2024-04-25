import { FileInput, Loader, ThemeIcon, rem } from "@mantine/core";
import { IconFileAlert, IconFileCheck, IconUpload } from "@tabler/icons-react";
import { useAdPurchaseFormContext } from "../form-context";
import { useUploadLogoMutation } from "../purchaseFormApi";
import { useCallback, useMemo, useState } from "react";
import { isErrorWithData } from "../../../common/helpers";

function useUploadLogo() {
  const [upload, { error }] = useUploadLogoMutation();
  const { setFieldValue } = useAdPurchaseFormContext();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const uploadLogo = useCallback(
    async (file: File | null) => {
      setStatus("loading");
      setFieldValue("brand_logo_checksum", undefined);
      if (!file) {
        setStatus("idle");
        return;
      }
      const formData = new FormData();
      formData.append("logo", file);
      try {
        const checksum = await upload(formData).unwrap();
        setFieldValue("brand_logo_checksum", checksum);
        setStatus("success");
        return;
      } catch (e) {
        setStatus("error");
        return;
      }
    },
    [upload, setFieldValue]
  );
  return { uploadLogo, status, error };
}

export function LogoUpload() {
  const { uploadLogo, status, error } = useUploadLogo();
  console.log("error", error);
  const errorMessage = useMemo(() => {
    if (!error) {
      return "";
    }
    if (!isErrorWithData(error)) {
      return "An error occurred";
    }
    return error.data.detail;
  }, [error]);

  const Icon = () => {
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
  };

  return (
    <FileInput
      label="Brand Logo"
      w="20rem"
      description="Include your high resolution logo"
      icon={<Icon />}
      rightSection={
        <ThemeIcon
          variant="outline"
          style={{ border: "none" }}
          color="brandDark.1"
        >
          <IconUpload size={rem(14)} />
        </ThemeIcon>
      }
      size="md"
      onChange={uploadLogo}
      error={errorMessage}
    />
  );
}
