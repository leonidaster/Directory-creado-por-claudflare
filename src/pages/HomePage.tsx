import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, UtensilsCrossed, ShoppingBag, Coffee, BedDouble, Sparkles, Wrench } from 'lucide-react';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { Listing, Category } from '@shared/types';
const iconMap: { [key: string]: React.ElementType } = {
  UtensilsCrossed,
  ShoppingBag,
  Coffee,
  BedDouble,
  Sparkles,
  Wrench,
};
export function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [listingsRes, categoriesRes] = await Promise.all([
          api<{ items: Listing[] }>('/api/listings?limit=3'),
          api<{ items: Category[] }>('/api/categories'),
        ]);
        setFeaturedListings(listingsRes.items);
        setCategories(categoriesRes.items);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
        setError("Sorry, we couldn't load the homepage content. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-background py-32 md:py-48 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10"></div>
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'radial-gradient(hsl(var(--muted)) 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground tracking-tighter">
            Discover Your Next Favorite Place
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Zenith is a curated directory of the best places and services, designed to help you explore with confidence.
          </p>
          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-grow">
              <Input
                type="search"
                placeholder="Search for restaurants, shops, services..."
                className="h-14 text-lg pl-12 rounded-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
            <Button type="submit" size="lg" className="h-14 text-lg rounded-lg shadow-sm">
              Search
            </Button>
          </form>
        </div>
      </section>
      {/* Featured Listings Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-12 text-center text-destructive bg-destructive/10 p-4 rounded-md">
              <p>{error}</p>
            </div>
          )}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">Featured Listings</h2>
            <p className="mt-4 text-lg text-muted-foreground">Handpicked selections from our editors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[225px] w-full rounded-lg" />
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/listings">
                Explore All Listings <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">Browse by Category</h2>
            <p className="mt-4 text-lg text-muted-foreground">Find what you're looking for, faster.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))
            ) : (
              categories.map((category) => {
                const Icon = iconMap[category.icon] || Sparkles;
                return (
                  <Link
                    key={category.slug}
                    to={`/listings?category=${category.slug}`}
                    className="group flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-sm text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                  >
                    <Icon className="h-10 w-10 mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-lg font-semibold">{category.name}</span>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}