import { Box } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { AdPurchase, PersonalAdSelection } from "./types";
import { AdPurchaseFormProvider, useAdPurchaseForm } from "./form-context";
import { IconX } from "@tabler/icons-react";
import { PurchaseViewerLayout } from "./PurchaseViewerLayout";
import { hasLength, isEmail, isNotEmpty } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementActiveStep,
  getActiveStep,
  incrementActiveStep,
} from "./purchaseFormSlice";
import { notifications } from "@mantine/notifications";

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

  useEffect(() => {
    document.title = "MarketAngler - Ad Designer";
  }, []);

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
      contact_state: null,
      contact_zip: null,
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
    if (activeStep === 5) {
      // submit the form
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
    console.log("submit");
    console.log(values);
    console.log(_event);
  };

  return (
    <Box>
      <AdPurchaseFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PurchaseViewerLayout
            activeStep={activeStep}
            onNext={onNext}
            onBack={onBack}
          />
        </form>
      </AdPurchaseFormProvider>
    </Box>
  );
}
