import { PublicAdOffering } from "../../types";
import {
  Card,
  Divider,
  List,
  ThemeIcon,
  Text,
  Title,
  Button,
  Flex,
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconComet,
  IconNews,
  IconPalette,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { useAdPurchaseFormContext } from "../../form-context";
import { useCallback, useMemo } from "react";

function printedInMessage(adOffering: PublicAdOffering) {
  return adOffering.color ? "color" : "black and white";
}

function pageRangeMessage(adOffering: PublicAdOffering) {
  if (adOffering.page_end !== null) {
    return `Between pages ${adOffering.page_start} and ${adOffering.page_end}`;
  }
  return `Between page ${adOffering.page_start} and the end of the publication`;
}

function useSelectedAdOfferings(adOffering: PublicAdOffering) {
  const adForm = useAdPurchaseFormContext();
  const selectedAdIndex = useMemo(() => {
    const selectedAds: PublicAdOffering[] = adForm.getInputProps(
      "selected_ad_offerings"
    ).value;
    return selectedAds.findIndex((ad) => ad.id === adOffering.id);
  }, [adForm, adOffering.id]);

  const onSelect = useCallback(() => {
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

function SelectButton({ adOffering }: { adOffering: PublicAdOffering }) {
  const { onSelect, onDeselect, selectedAdIndex } =
    useSelectedAdOfferings(adOffering);

  if (selectedAdIndex !== -1) {
    return (
      <Button
        variant="outline"
        onClick={onDeselect}
        leftIcon={
          <ThemeIcon
            variant="outline"
            color="brandYellow"
            style={{ border: "none" }}
          >
            <IconCircleCheck />
          </ThemeIcon>
        }
      >
        Selected
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onSelect}
      leftIcon={
        <ThemeIcon variant="outline" style={{ border: "none" }}>
          <IconCircle />
        </ThemeIcon>
      }
    >
      Select
    </Button>
  );
}

function CardHeader({ adOffering }: { adOffering: PublicAdOffering }) {
  return (
    <Flex justify={"space-between"} align={"center"}>
      <div>
        <Title order={3} fw={500}>
          {adOffering.name}
        </Title>
        <Title order={3} display="flex" style={{ alignItems: "baseline" }}>
          ${adOffering.price}{" "}
          <Text size={"xs"} px={".3rem"} fw={500}>
            per placement
          </Text>
        </Title>
      </div>
      <SelectButton adOffering={adOffering} />
    </Flex>
  );
}

export function AdChoiceCard({ adOffering }: { adOffering: PublicAdOffering }) {
  return (
    <Card withBorder shadow="sm" my="xs">
      <CardHeader adOffering={adOffering} />
      <List mt="xs" mx="auto" spacing={"sm"} size={"sm"}>
        <List.Item
          icon={
            <ThemeIcon size={24} radius="xl" color="brandBlue.3">
              <IconComet size="1rem" />
            </ThemeIcon>
          }
        >
          {Math.round(adOffering.impact_score * 100)}% Impact Score
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
