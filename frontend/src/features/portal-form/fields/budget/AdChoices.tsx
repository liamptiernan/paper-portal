import { useParams } from "react-router-dom";
import { useGetAdOfferingsQuery } from "../../purchaseFormApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { PublicAdOffering } from "../../types";
import { useAdPurchaseFormContext } from "../../form-context";
import {
  Card,
  Divider,
  List,
  ThemeIcon,
  Text,
  Title,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconComet,
  IconNews,
  IconPalette,
  IconRulerMeasure,
} from "@tabler/icons-react";

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
  const availableOfferings = adOfferings.filter(
    (adOffering) => adOffering.price <= budget
  );
  return { availableOfferings, isLoading };
}

function printedInMessage(adOffering: PublicAdOffering) {
  return adOffering.color ? "color" : "black and white";
}

function pageRangeMessage(adOffering: PublicAdOffering) {
  if (adOffering.page_end !== null) {
    return `Will appear between pages ${adOffering.page_start} and ${adOffering.page_end}`;
  }
  return `Will appear between page ${adOffering.page_start} and the end of the publication`;
}

function AdChoiceCard({ adOffering }: { adOffering: PublicAdOffering }) {
  // TODO: continue here
  // Add select button to top of card that sets this as the selected ad
  // in redux
  return (
    <Card withBorder shadow="sm">
      <Title order={3} fw={500}>
        {adOffering.name}
      </Title>
      <Title order={3} display="flex" style={{ alignItems: "center" }}>
        ${adOffering.price}{" "}
        <Text size={"xs"} px={".5rem"} fw={500}>
          per placement
        </Text>
      </Title>
      <List mt="xs" spacing={"sm"} size={"sm"}>
        <List.Item
          icon={
            <ThemeIcon size={24} radius="xl" color="brandBlue.3">
              <IconComet size="1rem" />
            </ThemeIcon>
          }
        >
          {adOffering.impact_score * 100}% Impact Score
        </List.Item>
        <Divider mt=".5rem" />
        <List.Item
          icon={
            <ThemeIcon size={24} radius="xl" color="brandBlue.3">
              <IconRulerMeasure size="1rem" />
            </ThemeIcon>
          }
        >
          {adOffering.size}
        </List.Item>
        <Divider mt=".5rem" />
        <List.Item
          icon={
            <ThemeIcon size={24} radius="xl" color="brandBlue.3">
              <IconPalette size="1rem" />
            </ThemeIcon>
          }
        >
          Printed in {printedInMessage(adOffering)}
        </List.Item>
        <Divider mt=".5rem" />
        <List.Item
          icon={
            <ThemeIcon size={24} radius="xl" color="brandBlue.3">
              <IconNews size="1rem" />
            </ThemeIcon>
          }
        >
          {pageRangeMessage(adOffering)}
        </List.Item>
      </List>
    </Card>
  );
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

  // TODO make this a scrollable section no bigger than page
  return (
    <>
      {availableOfferings.map((adOffering) => (
        <AdChoiceCard adOffering={adOffering} key={adOffering.id} />
      ))}
    </>
  );
}
