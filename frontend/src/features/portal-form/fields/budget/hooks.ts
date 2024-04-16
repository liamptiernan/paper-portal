import { useCallback, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAdPurchaseFormContext } from "../../form-context";
import { PublicAdOffering } from "../../types";
import { useGetAdOfferingsQuery } from "../../purchaseFormApi";

export function useAllSelectedAdOfferings() {
  const adForm = useAdPurchaseFormContext();
  const selectedAds: PublicAdOffering[] = adForm.getInputProps(
    "selected_ad_offerings"
  ).value;

  const onSelect = useCallback(
    (adOffering: PublicAdOffering) => {
      adForm.insertListItem("selected_ad_offerings", adOffering);
    },
    [adForm]
  );

  const onDeselect = useCallback(
    (adOffering: PublicAdOffering) => {
      const selectedAdIndex = selectedAds.findIndex(
        (ad) => ad.id === adOffering.id
      );
      if (selectedAdIndex === -1) {
        return;
      }
      adForm.removeListItem("selected_ad_offerings", selectedAdIndex);
    },
    [adForm, selectedAds]
  );
  return { selectedAds, onSelect, onDeselect };
}

export function useSelectedAdOffering(adOffering: PublicAdOffering) {
  const adForm = useAdPurchaseFormContext();
  const selectedAdIndex = useMemo(() => {
    const selectedAds: PublicAdOffering[] = adForm.getInputProps(
      "selected_ad_offerings"
    ).value;
    return selectedAds.findIndex((ad) => ad.id === adOffering.id);
  }, [adForm, adOffering.id]);

  const onSelect = useCallback(() => {
    const selectedAds = adForm.getInputProps("selected_ad_offerings").value;
    if (selectedAds.length !== 0) {
      // limit to one ad selected for now
      adForm.removeListItem("selected_ad_offerings", 0);
    }
    adForm.insertListItem("selected_ad_offerings", adOffering);
  }, [adForm, adOffering]);

  const onDeselect = useCallback(() => {
    if (selectedAdIndex === -1) {
      return;
    }
    adForm.removeListItem("selected_ad_offerings", selectedAdIndex);
  }, [adForm, selectedAdIndex]);
  return { onSelect, onDeselect, selectedAdIndex };
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
