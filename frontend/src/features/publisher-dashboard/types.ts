export interface PublicationRegion {
  id: number;
  zip_code: string;
  reach?: string;
}

export interface Publication {
  id: number;
  name: string;
  distribution_unit: string;
  estimated_reach?: number;
  format?: string;
  regions: Partial<PublicationRegion>[];
}
