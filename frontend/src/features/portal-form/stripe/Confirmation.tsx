import { Container, Title, Text, Space } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setActiveStep } from "../purchaseFormSlice";
import { useAppDispatch } from "../../../app/hooks";

// TODO: continue here
// On checkout, submit form and save ad purchase as pending
// pass ID of ad offering when creating checkout session to drive price / product
// also save the session_id with the purchase. this is the uuid of that purchase and source of truth for state
// when complete, fetch ad form and session and display order details

// add a back button to allow users to leave the checkout view

export function PurchaseConfirmation() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    dispatch(setActiveStep(7));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(searchParams.get("session"));
  return (
    <Container size={"sm"}>
      <Title>
        <Text span inherit color="brandBlue">
          Thanks for your order!
        </Text>
        <Space h="md" />
        <Text inherit fw={400} fz={"xl"}></Text>
        <Space h="md" />
        <Text inherit fw={400} fz={"xl"}>
          We're preparing everything needed to reach your audience.
        </Text>
        <Space h="md" />
        <Text inherit fw={400} fz={"xl"}>
          We'll send you a confirmation email to let you know when and where to
          expect your ad.
        </Text>
        <Space h="md" />
        <Text inherit fw={400} fz={"xl"}>
          Order Number: #203GA1
        </Text>
      </Title>
    </Container>
  );
}
