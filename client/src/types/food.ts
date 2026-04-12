export interface Food {
  id: number;
  title: string;
  description?: string;
  price: number;
  calories?: number;
  diet_type: string;
  disease_tag?: string;
  image_url?: string;
  provider_id: number;
  provider_type: string;
  is_available: boolean;
}