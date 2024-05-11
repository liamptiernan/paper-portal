import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import { useCreateCheckoutSessionMutation } from "../purchaseFormApi";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { Flex } from "@mantine/core";

const stripePromise = loadStripe(
  "pk_test_51PF0P9K2QqtW2JdslWkoDHCdCBHEhtLqd189UsQ7WCXWeaXSKwvmRsCQRsQBX76oKG7zLbj2EMtEckrpSpkNwUr200ghcnqUMw"
);

export function Checkout() {
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const fetchClientSecret = useCallback(async () => {
    try {
      return await createCheckoutSession().unwrap();
    } catch (error) {
      console.error("Failed to create checkout session", error);
      return "";
    }
  }, [createCheckoutSession]);

  return (
    <Flex justify={"center"}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Flex>
  );
}
