// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Listing {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  location: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  tags: string[];
  details: {
    address: string;
    phone: string;
    website: string;
    hours: string;
  };
}
export interface Category {
  id: string; // Added to satisfy IndexedEntity constraint
  name: string;
  slug: string;
  icon: string; // Storing icon name as string
}