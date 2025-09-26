import { Hono } from "hono";
import type { Env } from './core-utils';
import { ListingEntity, CategoryEntity } from "./entities";
import { ok, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure data is seeded on first request in a new environment
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      ListingEntity.ensureSeed(c.env),
      CategoryEntity.ensureSeed(c.env),
    ]);
    await next();
  });
  // LISTINGS
  app.get('/api/listings', async (c) => {
    const { q, category, location, tags, limit: limitStr } = c.req.query();
    const limit = limitStr ? parseInt(limitStr, 10) : undefined;

    // Fetch all listings first, as the data layer doesn't support filtering.
    const page = await ListingEntity.list(c.env);
    let items = page.items;

    // Apply filters in-memory
    if (q) {
      const lowerQ = q.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQ) ||
          item.description.toLowerCase().includes(lowerQ)
      );
    }
    if (category) {
      items = items.filter((item) => item.category === category);
    }
    if (location) {
      const lowerLocation = location.toLowerCase();
      items = items.filter((item) =>
        item.location.toLowerCase().includes(lowerLocation)
      );
    }
    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim());
      items = items.filter((item) =>
        tagList.every((tag) => item.tags.includes(tag))
      );
    }

    // Apply limit after filtering
    if (limit) {
      items = items.slice(0, limit);
    }

    // For this phase, pagination (next cursor) is simplified and returns all filtered results.
    // A full implementation would require more complex cursor logic based on filtered data.
    return ok(c, { items, next: null });
  });
  app.get('/api/listings/:id', async (c) => {
    const { id } = c.req.param();
    const listing = new ListingEntity(c.env, id);
    if (!(await listing.exists())) {
      return notFound(c, 'Listing not found');
    }
    return ok(c, await listing.getState());
  });
  // CATEGORIES
  app.get('/api/categories', async (c) => {
    const page = await CategoryEntity.list(c.env);
    return ok(c, page);
  });
}