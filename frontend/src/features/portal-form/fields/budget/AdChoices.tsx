import { useParams } from "react-router-dom";
import { useGetAdOfferingsQuery } from "../../purchaseFormApi";
import { skipToken } from "@reduxjs/toolkit/query";

export function AdChoices() {
  const params = useParams();
  const publicationId = params.publicationId;
  const { data: adOfferings } = useGetAdOfferingsQuery(
    publicationId || skipToken
  );

  // TODO: continue here
  // pull in the current budget setting and filter ad offerings based on that
  // add price to endpoint as filter
  if (!adOfferings) {
    return null;
  }
  return <>{adOfferings.map((adOffering) => adOffering.name)}</>;
}
