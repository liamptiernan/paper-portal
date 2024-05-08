import { useAllSelectedAdOfferings } from "../fields/budget/hooks";

export function useCostSummary() {
  const { selectedAd } = useAllSelectedAdOfferings();
  const subTotal = selectedAd?.price || 0;
  // TODO: probably hook into stripe for this, to get right value for state
  const tax = subTotal * 0.08;
  const total = subTotal + tax;
  return { subTotal, tax, total };
}
