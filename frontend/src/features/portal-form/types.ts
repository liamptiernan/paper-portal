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
  business_name?: string;
  email?: string;
  business_description?: string;
  campaign_goal?: string;
  personal_ad: PersonalAdSelection;
  personal_ad_checksum?: string;
  brand_colors?: string[];
  brand_logo_checksum?: string;
  ad_phone_number?: string;
  ad_email?: string;
  ad_website?: string;
  provided_copy?: string;
  regions: string[];
  target_area_center: string;
  target_area_radius: number;
  advanced_options: boolean;
  target_section?: string;
  target_ages: number[];
  target_genders: string[];
  target_publications: string[];
  target_monthly_spend?: number;
  contact_name?: string;
  contact_phone?: string;
  address_1?: string;
  address_2?: string;
  address_city?: string;
  address_state?: States;
  address_zip?: number;
}
