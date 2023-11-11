export interface PublicationRegion {
  id?: number;
  zip_code?: string;
  reach: number | null;
}

export interface Publication {
  id: number;
  org_id: number;
  name: string;
  description: string | null;
  format: string;
  location: string | null;
  distribution_unit: string;
  estimated_reach: number;
  region_type: string;
  distribution_radius: number;
  regions: PublicationRegion[];
}
