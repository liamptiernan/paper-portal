import { useAdPurchaseFormContext } from "../../form-context";
import { useUploadLogoMutation } from "../../purchaseFormApi";
import { useCallback, useState } from "react";
import { FileUpload } from "../../../../components/Upload";

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

  return (
    <FileUpload
      label="Brand Logo"
      description="Include your high resolution logo"
      onChange={uploadLogo}
      errorResponse={error}
      status={status}
    />
  );
}
