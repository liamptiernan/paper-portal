import {
  Box,
  Container,
  Flex,
  Space,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
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
  IconX,
} from "@tabler/icons-react";
import { PurchaseViewerLayout } from "./PurchaseViewerLayout";
import { useGeneralStyles } from "./styles";
import { hasLength, isEmail, isNotEmpty } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementActiveStep,
  getActiveStep,
  incrementActiveStep,
} from "./purchaseFormSlice";
import { notifications } from "@mantine/notifications";

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

function useValidateForm() {
  const activeStep = useAppSelector(getActiveStep);

  const validate = useCallback(
    (values: AdPurchase) => {
      if (activeStep === 0) {
        return {
          business_name: isNotEmpty("Business name is required")(
            values.business_name
          ),
          email: isEmail("Must be a valid email")(values.email),
        };
      }
      if (activeStep === 1) {
        return {
          business_description: isNotEmpty("Business description is required")(
            values.business_description
          ),
          campaign_goal:
            values.campaign_goal.length === 0
              ? "Select at least one campaign goal"
              : null,
        };
      }
      if (activeStep === 2) {
        if (!values.selected_ad_offering) {
          notifications.show({
            title: "Ad option required",
            icon: <IconX />,
            message: "You must select an ad option to continue",
            color: "red",
          });
          return {
            selected_ad_offering: "You must select an ad option",
          };
        }
      }
      if (activeStep === 3) {
        if (values.personal_ad === PersonalAdSelection.Personal) {
          return {
            personal_ad_checksum: isNotEmpty(
              "If providing your own ad, you must upload a file"
            )(values.personal_ad_checksum),
          };
        }
      }
      if (activeStep === 5) {
        return {
          contact_name: isNotEmpty("Required")(values.contact_name),
          contact_phone:
            isNotEmpty("Required")(values.contact_phone) ||
            hasLength({ min: 7 }, "Must be 7 digits")(values.contact_phone),
          contact_address_1: isNotEmpty("Required")(values.contact_address_1),
          contact_city: isNotEmpty("Required")(values.contact_city),
          contact_state: isNotEmpty("Required")(values.contact_state),
          contact_zip: isNotEmpty("Required")(values.contact_zip),
        };
      }
      return {};
    },
    [activeStep]
  );

  return validate;
}

export function AdPurchaseForm() {
  const dispatch = useAppDispatch();
  const validateForm = useValidateForm();

  const activeStep = useAppSelector(getActiveStep);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    document.title = "MarketAngler - Ad Designer";
  }, []);

  const { classes: controllerClasses } = useGeneralStyles();

  const form = useAdPurchaseForm({
    initialValues: {
      business_name: "",
      email: "",
      business_description: "",
      campaign_goal: [],
      selected_ad_offering: null,
      personal_ad: PersonalAdSelection.Designed,
      personal_ad_checksum: "",
      brand_colors: [],
      contact_name: "",
      contact_phone: "",
      contact_address_1: "",
      contact_city: "",
      billing_name: "",
      billing_phone: "",
      billing_address_1: "",
      billing_city: "",
    },
    validate: validateForm,
  });

  const onNext = () => {
    if (form.validate().hasErrors) {
      return;
    }
    dispatch(incrementActiveStep());
  };

  const onBack = () => {
    dispatch(decrementActiveStep());
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
