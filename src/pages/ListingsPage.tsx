import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal, AlertCircle, Frown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { api } from '@/lib/api-client';
import type { Listing, Category } from '@shared/types';
import { useDebounce } from 'react-use';
export function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || '',
    tags: searchParams.get('tags')?.split(',') || [],
  });
  const [debouncedQuery, setDebouncedQuery] = useState(filters.q);
  useDebounce(() => setFilters(prev => ({ ...prev, q: debouncedQuery })), 500, [debouncedQuery]);
  const fetchListings = useCallback(async (currentFilters: typeof filters) => {
    try {
      setLoading(true);
      setError(null);
      const query = new URLSearchParams();
      if (currentFilters.q) query.set('q', currentFilters.q);
      if (currentFilters.category && currentFilters.category !== 'all') query.set('category', currentFilters.category);
      if (currentFilters.location) query.set('location', currentFilters.location);
      if (currentFilters.tags.length > 0) query.set('tags', currentFilters.tags.join(','));
      const listingsRes = await api<{ items: Listing[] }>(`/api/listings?${query.toString()}`);
      setListings(listingsRes.items);
    } catch (err) {
      setError("Failed to load listings. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const initialFetch = async () => {
      try {
        const [tagsRes, categoriesRes] = await Promise.all([
          api<{ items: string[] }>('/api/tags'),
          api<{ items: Category[] }>('/api/categories'),
        ]);
        setCategories(categoriesRes.items);
        setAllTags(tagsRes.items.sort());
      } catch (err) {
        setError("Failed to load filter options.");
        console.error(err);
      }
    };
    initialFetch();
  }, []);
  useEffect(() => {
    fetchListings(filters);
    const newSearchParams = new URLSearchParams();
    if (filters.q) newSearchParams.set('q', filters.q);
    if (filters.category && filters.category !== 'all') newSearchParams.set('category', filters.category);
    if (filters.location) newSearchParams.set('location', filters.location);
    if (filters.tags.length > 0) newSearchParams.set('tags', filters.tags.join(','));
    setSearchParams(newSearchParams, { replace: true });
  }, [filters, fetchListings, setSearchParams]);
  const handleTagChange = (tag: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      tags: checked ? [...prev.tags, tag] : prev.tags.filter(t => t !== tag),
    }));
  };
  const handleClearFilters = () => {
    const clearedFilters = { q: '', category: 'all', location: '', tags: [] };
    setFilters(clearedFilters);
    setDebouncedQuery('');
  };
  const filterControls = (
    <FilterControls
      allTags={allTags}
      categories={categories}
      filters={filters}
      onQueryChange={setDebouncedQuery}
      onCategoryChange={(val) => setFilters(prev => ({ ...prev, category: val }))}
      onLocationChange={(val) => setFilters(prev => ({ ...prev, location: val }))}
      onTagChange={handleTagChange}
      onClear={handleClearFilters}
    />
  );
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground">Explore Our Directory</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the best places and services, reviewed by our community. Use the filters to narrow down your search.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-full lg:w-1/4">
          <div className="sticky top-24 space-y-8 p-6 bg-card rounded-lg border">
            {filterControls}
          </div>
        </aside>
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {loading ? 'Searching...' : `Showing ${listings.length} results`}
            </p>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Results</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    {filterControls}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[225px] w-full rounded-lg" />
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg border border-destructive/20">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg border">
              <Frown className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
function FilterControls({ allTags, categories, filters, onQueryChange, onCategoryChange, onLocationChange, onTagChange, onClear }: {
  allTags: string[],
  categories: Category[],
  filters: { q: string; category: string; location: string; tags: string[] },
  onQueryChange: (val: string) => void,
  onCategoryChange: (val: string) => void,
  onLocationChange: (val: string) => void,
  onTagChange: (tag: string, checked: boolean) => void,
  onClear: () => void
}) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <div className="relative">
          <Input
            placeholder="Keywords..."
            className="pr-10"
            value={filters.q}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <Select value={filters.category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <Input
          placeholder="City, State, or Zip"
          value={filters.location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {allTags.map(tag => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={filters.tags.includes(tag)}
                onCheckedChange={(checked) => onTagChange(tag, !!checked)}
              />
              <Label htmlFor={tag} className="capitalize font-normal">{tag}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={onClear}>Clear Filters</Button>
    </>
  );
}