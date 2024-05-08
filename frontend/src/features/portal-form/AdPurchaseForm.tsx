import {
  Box,
  Container,
  Flex,
  Space,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { AdPurchase, PersonalAdSelection } from "./types";
import { AdPurchaseFormProvider, useAdPurchaseForm } from "./form-context";
import {
  IconAd2,
  IconAddressBook,
  IconAdjustmentsHorizontal,
  IconBuildingStore,
  IconCashBanknote,
  IconReportAnalytics,
  IconSparkles,
} from "@tabler/icons-react";
import { PurchaseViewerLayout } from "./PurchaseViewerLayout";
import { useGeneralStyles } from "./styles";

function SubmitView() {
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

export function AdPurchaseForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    document.title = "MarketAngler - Ad Designer";
  }, []);

  const { classes: controllerClasses } = useGeneralStyles();

  const form = useAdPurchaseForm({
    initialValues: {
      personal_ad: PersonalAdSelection.Designed,
      regions: [],
      target_publications: [],
      target_area_radius: 50,
      target_area_center: "12202",
      target_monthly_spend: 250,
    },
    validate: {
      email: (value) => {
        if (!value) {
          return null;
        }
        /^\S+@\S+$/.test(value) ? null : "Invalid email";
      },
    },
  });

  const onNext = () => {
    setActiveStep((active) => active + 1);
  };

  const onBack = () => {
    setActiveStep((active) => (active > 0 ? active - 1 : active));
  };

  const handleSubmit = (
    values: AdPurchase,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    setHasSubmitted(true);
    console.log("submit");
    console.log(values);
    console.log(_event);
  };

  // TODO: add form validation and routing
  return (
    <Box>
      {!hasSubmitted && (
        <AdPurchaseFormProvider form={form}>
          <Flex direction={{ base: "row", md: "column" }}>
            <Stepper
              // add border right
              // margin auto
              classNames={{ stepLabel: controllerClasses.hideMobile }}
              active={activeStep}
              breakpoint={"md"}
            >
              <Stepper.Step label="Welcome" icon={<IconSparkles />} />
              <Stepper.Step label="Business" icon={<IconBuildingStore />} />
              <Stepper.Step label="Budget" icon={<IconReportAnalytics />} />
              <Stepper.Step label="Design" icon={<IconAd2 />} />
              <Stepper.Step
                label="Demographics"
                icon={<IconAdjustmentsHorizontal />}
              />
              <Stepper.Step label="Contact" icon={<IconAddressBook />} />
              <Stepper.Step label="Payment" icon={<IconCashBanknote />} />
            </Stepper>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <PurchaseViewerLayout
                activeStep={activeStep}
                onNext={onNext}
                onBack={onBack}
              />
            </form>
          </Flex>
        </AdPurchaseFormProvider>
      )}
      {hasSubmitted && <SubmitView />}
    </Box>
  );
}
