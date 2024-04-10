import { useParams } from "react-router-dom";
import { Loader, Center, Box } from "@mantine/core";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAdOfferingsQuery } from "../../purchaseFormApi";
import { PublicAdOffering } from "../../types";
import { useAdPurchaseFormContext } from "../../form-context";
import { AdChoiceCard } from "./AdChoiceCard";

function useAvailableAdOfferings(publicationId?: string): {
  availableOfferings: PublicAdOffering[];
  isLoading: boolean;
} {
  /*
   * Get all add offerings for publication
   * Filter by current budget selection
   */
  const { data: adOfferings, isLoading } = useGetAdOfferingsQuery(
    publicationId ?? skipToken
  );
  const { getInputProps } = useAdPurchaseFormContext();
  const budget: number = getInputProps("target_monthly_spend").value;
  if (!adOfferings) {
    return { availableOfferings: [], isLoading };
  }
  const availableOfferings = adOfferings
    .filter((adOffering) => adOffering.price <= budget)
    .sort((a, b) => b.impact_score - a.impact_score);
  return { availableOfferings, isLoading };
}

export function AdChoices() {
  const params = useParams();
  const publicationId = params.publicationId;
  const { availableOfferings, isLoading } =
    useAvailableAdOfferings(publicationId);

  if (isLoading) {
    return (
      <Center mt="lg">
        <Loader />
      </Center>
    );
  }

  return (
    <Box
      sx={(theme) => ({
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: theme.colors.gray[3],
        maxHeight: "calc(100vh - 375px)",
        overflow: "auto",
      })}
      px="md"
    >
      {availableOfferings.map((adOffering) => (
        <AdChoiceCard adOffering={adOffering} key={adOffering.id} />
      ))}
    </Box>
  );
}
