import { Divider, Flex, Text, ThemeIcon } from "@mantine/core";
import { useCostSummary } from "./hooks";
import { useAllSelectedAdOfferings } from "../fields/budget/hooks";
import { PublicAdOffering } from "../types";
import { IconMoodLookDown } from "@tabler/icons-react";

function AdLineItem({ ad }: { ad: PublicAdOffering }) {
  return (
    <Flex justify={"space-between"}>
      <Text>{ad.name}</Text>
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
  const { selectedAds } = useAllSelectedAdOfferings();
  if (selectedAds.length === 0) {
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
      {selectedAds.map((ad) => (
        <AdLineItem ad={ad} key={ad.id} />
      ))}
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
