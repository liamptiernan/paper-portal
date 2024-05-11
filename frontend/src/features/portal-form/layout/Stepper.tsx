import { Flex, Stepper } from "@mantine/core";
import {
  IconAd2,
  IconAddressBook,
  IconAdjustmentsHorizontal,
  IconBuildingStore,
  IconCashBanknote,
  IconReportAnalytics,
  IconSparkles,
} from "@tabler/icons-react";
import { useAppSelector } from "../../../app/hooks";
import { getActiveStep } from "../purchaseFormSlice";
import { useGeneralStyles } from "../styles";
import { Outlet } from "react-router-dom";

export function FormStepperLayout() {
  const activeStep = useAppSelector(getActiveStep);
  const { classes: controllerClasses } = useGeneralStyles();
  return (
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
      <Outlet />
    </Flex>
  );
}
