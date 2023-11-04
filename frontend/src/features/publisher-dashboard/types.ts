export interface PublicationRegion {
  id: number;
  publication_id: number;
  zip_code: string;
  reach?: number;
}

export interface Publication {
  id: number;
  name: string;
  distribution_unit: string;
  estimated_reach?: number;
  format?: string;
  regions: PublicationRegion[];
}
