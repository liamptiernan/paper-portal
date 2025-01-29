import { useCallback, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAdPurchaseFormContext } from "../../form-context";
import { PublicAdOffering } from "../../types";
import { useGetAdOfferingsQuery } from "../../purchaseFormApi";

export function useAllSelectedAdOfferings() {
  const adForm = useAdPurchaseFormContext();
  const selectedAd: PublicAdOffering | null = adForm.getInputProps(
    "selected_ad_offering"
  ).value;
  return { selectedAd };
}

export function useSelectedAdOffering(adOffering: PublicAdOffering) {
  const adForm = useAdPurchaseFormContext();
  const isSelectedAd = useMemo(() => {
    const selectedAd: PublicAdOffering | null = adForm.getInputProps(
      "selected_ad_offering"
    ).value;
    if (!selectedAd) {
      return false;
    }
    return selectedAd.id === adOffering.id;
  }, [adForm, adOffering.id]);

  const onSelect = useCallback(() => {
    adForm.setFieldValue("selected_ad_offering", adOffering);
  }, [adForm, adOffering]);

  const onDeselect = useCallback(() => {
    if (!isSelectedAd) {
      return;
    }
    adForm.setFieldValue("selected_ad_offering", null);
  }, [adForm, isSelectedAd]);
  return { onSelect, onDeselect, isSelectedAd };
}

export function useAvailableAdOfferings(publicationId?: string): {
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
