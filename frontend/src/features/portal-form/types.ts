import { PublicationRegion } from "../publisher-dashboard/types";

export enum PersonalAdSelection {
  Personal = "personal",
  Designed = "designed",
}

export enum States {
  "AL" = "AL",
  "AK" = "AK",
  "AS" = "AS",
  "AZ" = "AZ",
  "AR" = "AR",
  "CA" = "CA",
  "CO" = "CO",
  "CT" = "CT",
  "DE" = "DE",
  "DC" = "DC",
  "FM" = "FM",
  "FL" = "FL",
  "GA" = "GA",
  "GU" = "GU",
  "HI" = "HI",
  "ID" = "ID",
  "IL" = "IL",
  "IN" = "IN",
  "IA" = "IA",
  "KS" = "KS",
  "KY" = "KY",
  "LA" = "LA",
  "ME" = "ME",
  "MH" = "MH",
  "MD" = "MD",
  "MA" = "MA",
  "MI" = "MI",
  "MN" = "MN",
  "MS" = "MS",
  "MO" = "MO",
  "MT" = "MT",
  "NE" = "NE",
  "NV" = "NV",
  "NH" = "NH",
  "NJ" = "NJ",
  "NM" = "NM",
  "NY" = "NY",
  "NC" = "NC",
  "ND" = "ND",
  "MP" = "MP",
  "OH" = "OH",
  "OK" = "OK",
  "OR" = "OR",
  "PW" = "PW",
  "PA" = "PA",
  "PR" = "PR",
  "RI" = "RI",
  "SC" = "SC",
  "SD" = "SD",
  "TN" = "TN",
  "TX" = "TX",
  "UT" = "UT",
  "VT" = "VT",
  "VI" = "VI",
  "VA" = "VA",
  "WA" = "WA",
  "WV" = "WV",
  "WI" = "WI",
  "WY" = "WY",
}

export interface AdPurchase {
  business_name: string;
  email: string;
  business_description: string;
  campaign_goal: string[];
  selected_ad_offering: PublicAdOffering | null;
  personal_ad: PersonalAdSelection;
  personal_ad_checksum: string;
  brand_colors: string[];
  brand_logo_checksum?: string;
  ad_phone_number?: string;
  ad_email?: string;
  ad_website?: string;
  provided_copy?: string;
  target_section?: string;
  contact_name: string;
  contact_phone: string;
  contact_address_1: string;
  contact_address_2?: string;
  contact_city: string;
  contact_state?: States;
  contact_zip?: number;
  billing_name: string;
  billing_phone: string;
  billing_address_1: string;
  billing_address_2?: string;
  billing_city: string;
  billing_state?: States;
  billing_zip?: number;
}

export interface PublicAdOffering {
  id: number;
  name: string;
  impact_score: number;
  size: string;
  x_dimension: number;
  y_dimension: number;
  page_start: number;
  page_end: number | null;
  color: boolean;
  price: number;
  index: number;
}

export interface PublicPublication {
  id: number;
  name: string;
  description: string | null;
  format: string;
  location: string | null;
  distribution_unit: string;
  estimated_reach: number;
  region_type: string;
  distribution_radius: number;
  regions: PublicationRegion[];
  sections: string[];
}
