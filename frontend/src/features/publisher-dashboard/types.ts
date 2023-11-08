export interface PublicationRegion {
  id?: number;
  zip_code?: string;
  reach?: number;
}

export interface Publication {
  id: number;
  name: string;
  description?: string;
  location?: string;
  distribution_unit: string;
  estimated_reach?: number;
  region_type?: string;
  distribution_radius?: number;
  format?: string;
  regions: PublicationRegion[];
}
