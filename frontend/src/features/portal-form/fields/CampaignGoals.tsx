import { MultiSelect, TextInput, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";

function BusinessSummary() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <TextInput
      label="What does your business do?"
      placeholder='e.g. "Plumbing, specializing in residential and refrigeration"'
      required
      size="md"
      {...getInputProps("business_description")}
    />
  );
}

function CampaignGoal() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "phone_calls", label: "Phone Calls" },
    { value: "website_visits", label: "Website Visits" },
    { value: "Name Recognition", label: "Name Recognition" },
    { value: "social", label: "Social Media Engagement" },
    { value: "unsure", label: "Not sure yet" },
    { value: "other", label: "Other" },
  ];
  return (
    <MultiSelect
      data={options}
      label={"What is the goal of your ad campaign?"}
      required
      placeholder="Select all that apply"
      size="md"
      {...getInputProps("campaign_goal")}
    />
  );
}

function OtherCampaignGoal() {
  const { getInputProps } = useAdPurchaseFormContext();
  const display =
    getInputProps("campaign_goal").value &&
    getInputProps("campaign_goal").value.includes("other");

  return (
    <>
      {display ? (
        <>
          <TextInput
            label="You selected other. What are your other campaign goals?"
            size="md"
            {...getInputProps("brand_colors")}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export function CampaignSummary() {
  return (
    <FormSection
      title={<Title fw={400}>Tell us about your business and goals.</Title>}
    >
      <BusinessSummary />
      <CampaignGoal />
      <OtherCampaignGoal />
    </FormSection>
  );
}
