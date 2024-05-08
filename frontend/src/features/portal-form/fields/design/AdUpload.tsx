import { useCallback, useState } from "react";
import { FileUpload } from "../../../../components/Upload";
import { useAdPurchaseFormContext } from "../../form-context";
import { useUploadAdMutation } from "../../purchaseFormApi";
import { useAllSelectedAdOfferings } from "../budget/hooks";
import { Text } from "@mantine/core";

function useUploadAd() {
  const [upload, { error }] = useUploadAdMutation();
  const { setFieldValue } = useAdPurchaseFormContext();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const uploadAd = useCallback(
    async (file: File | null) => {
      setStatus("loading");
      setFieldValue("personal_ad_checksum", undefined);
      if (!file) {
        setStatus("idle");
        return;
      }
      const formData = new FormData();
      formData.append("ad", file);
      try {
        const checksum = await upload(formData).unwrap();
        setFieldValue("personal_ad_checksum", checksum);
        setStatus("success");
        return;
      } catch (e) {
        setStatus("error");
        return;
      }
    },
    [upload, setFieldValue]
  );
  return { uploadAd, status, error };
}

export function AdUpload() {
  const { uploadAd, status, error } = useUploadAd();
  const { selectedAd } = useAllSelectedAdOfferings();
  let description;
  if (selectedAd) {
    description = (
      <div>
        <Text>
          Ad must be {selectedAd.x_dimension} inches x {selectedAd.y_dimension}{" "}
          inches. At least 300 DPI is recommended.
        </Text>{" "}
        <Text>We'll verify your ad and approve it.</Text>
      </div>
    );
  }

  return (
    <FileUpload
      label="Upload Your Ad"
      description={description}
      onChange={uploadAd}
      errorResponse={error}
      status={status}
    />
  );
}
