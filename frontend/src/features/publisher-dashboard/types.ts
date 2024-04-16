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

export interface AdOffering {
  id: number;
  name: string;
  publication_id: number;
  impact_score: number;
  size: string;
  x_dimension: number;
  y_dimension: number;
  page_start: number;
  page_end: number | null;
  color: boolean;
  price: number;
  index: number;
  publication: Publication;
}
