export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string;
  diet_type?: string;
}