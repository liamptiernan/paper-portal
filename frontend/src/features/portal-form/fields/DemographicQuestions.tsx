import { Select, Space, Text, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";
import { DatePickerInput } from "@mantine/dates";
import { useGetPublicationQuery } from "../../publisher-dashboard/publications/publicationsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

function useGetSectionOptions() {
  const params = useParams();
  const publicationId = params["publicationId"];
  const { data: publication } = useGetPublicationQuery(
    publicationId ?? skipToken
  );

  return publication?.sections.map((section) => ({
    label: section,
    value: section,
  }));
}

function Section() {
  const { getInputProps } = useAdPurchaseFormContext();
  const sectionOptions = useGetSectionOptions();

  if (!sectionOptions) {
    return null;
  }

  return (
    <Select
      label="What section of the paper do you want your ad to appear in?"
      description="We'll contact you if we can't accommodate your request."
      data={sectionOptions}
      size="md"
      {...getInputProps("target_section")}
    />
  );
}

function PublicationDate() {
  const { getInputProps } = useAdPurchaseFormContext();

  return (
    <DatePickerInput
      label="In what range of dates would you like us to print your ad?"
      description="We'll contact you if we can't accommodate your request."
      type="range"
      size="md"
      {...getInputProps("target_dates")}
    />
  );
}

export function DemographicQuestions() {
  const SectionTitle = (
    <Title fw={400}>
      <Text span inherit>
        Who's your target audience?
      </Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"} color="brandDark.2">
        Leave optional questions blank, and we'll make the best decision for
        you.
      </Text>
    </Title>
  );
  return (
    <FormSection title={SectionTitle}>
      <Section />
      <PublicationDate />
    </FormSection>
  );
}
