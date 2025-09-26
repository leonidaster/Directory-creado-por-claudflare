import { IndexedEntity } from "./core-utils";
import type { Listing, Category } from "@shared/types";
import { MOCK_LISTINGS, MOCK_CATEGORIES } from "@shared/mock-data";
// LISTING ENTITY
export class ListingEntity extends IndexedEntity<Listing> {
  static readonly entityName = "listing";
  static readonly indexName = "listings";
  static readonly initialState: Listing = {
    id: "",
    title: "",
    summary: "",
    description: "",
    category: "",
    location: "",
    image: "",
    images: [],
    rating: 0,
    reviews: 0,
    tags: [],
    details: {
      address: "",
      phone: "",
      website: "",
      hours: "",
    },
  };
  static seedData = MOCK_LISTINGS;
}
// CATEGORY ENTITY
export class CategoryEntity extends IndexedEntity<Category> {
  static readonly entityName = "category";
  static readonly indexName = "categories";
  static readonly initialState: Category = {
    id: "",
    name: "",
    slug: "",
    icon: "",
  };
  static seedData = MOCK_CATEGORIES;
}