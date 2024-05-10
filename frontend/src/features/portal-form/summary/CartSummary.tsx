import { ActionIcon, Divider, Flex, Text, ThemeIcon } from "@mantine/core";
import { useCostSummary } from "./hooks";
import {
  useAllSelectedAdOfferings,
  useSelectedAdOffering,
} from "../fields/budget/hooks";
import { PublicAdOffering } from "../types";
import { IconMoodLookDown, IconX } from "@tabler/icons-react";

function AdLineItem({ ad }: { ad: PublicAdOffering }) {
  const { onDeselect } = useSelectedAdOffering(ad);
  return (
    <Flex justify={"space-between"}>
      <Flex align={"center"}>
        <ActionIcon
          size="xs"
          radius="xl"
          color="brandRed.1"
          variant="subtle"
          onClick={onDeselect}
        >
          <IconX />
        </ActionIcon>
        <Text>{ad.name}</Text>
      </Flex>
      <Text>${ad.price}</Text>
    </Flex>
  );
}

function ListHeader() {
  return (
    <>
      <Flex justify={"space-between"}>
        <Text fw={500}>Ad Name</Text>
        <Text fw={500}>Cost</Text>
      </Flex>
      <Divider variant={"dashed"} />
    </>
  );
}

function AdList() {
  const { selectedAd } = useAllSelectedAdOfferings();
  if (!selectedAd) {
    return (
      <div>
        <Divider mb={"sm"} />
        <ListHeader />
        <Flex direction={"column"} align={"center"} mt="xs">
          <ThemeIcon
            size="sm"
            variant="outline"
            color="brandDark.0"
            style={{ border: "none" }}
          >
            <IconMoodLookDown />
          </ThemeIcon>
          <Text size={"sm"} color="brandDark.0" align="center">
            No ad selected
          </Text>
        </Flex>
      </div>
    );
  }
  return (
    <div>
      <Divider mb={"sm"} />
      <ListHeader />
      {selectedAd && <AdLineItem ad={selectedAd} />}
    </div>
  );
}

function TotalSection() {
  const { subTotal, tax, total } = useCostSummary();
  return (
    <div>
      <Divider />
      <Flex justify={"space-between"}>
        <Text align="left">Subtotal</Text>
        <Text>${subTotal}</Text>
      </Flex>
      <Flex justify={"space-between"}>
        <Text align="left">Tax</Text>
        <Text>${tax}</Text>
      </Flex>
      <Flex justify={"space-between"}>
        <Text size="lg" align="left">
          Total
        </Text>
        <Text size="lg">${total}</Text>
      </Flex>
    </div>
  );
}

export function CartSummary() {
  return (
    <>
      <AdList />
      <TotalSection />
    </>
  );
}
