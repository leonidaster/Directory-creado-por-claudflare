import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Globe, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await api<Listing>(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError("Could not find the requested listing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);
  if (loading) {
    return <ListingDetailSkeleton />;
  }
  if (error || !listing) {
    return (
      <div className="container max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
        <h1 className="text-4xl font-bold font-display">Listing Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {error || "Sorry, we couldn't find the listing you're looking for."}
        </p>
        <Button asChild className="mt-8">
          <Link to="/listings">Back to Listings</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <header className="mb-12">
        <Badge variant="secondary" className="mb-4">{listing.category}</Badge>
        <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground">{listing.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-foreground">{listing.rating}</span>
            <span>({listing.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{listing.location}</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
            </AspectRatio>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">About {listing.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{listing.description}</p>
          </section>
          <section>
            <h2 className="text-3xl font-bold font-display mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listing.images.map((img, index) => (
                <AspectRatio key={index} ratio={1} className="bg-muted rounded-lg overflow-hidden">
                  <img src={img} alt={`${listing.title} gallery image ${index + 1}`} className="w-full h-full object-cover" />
                </AspectRatio>
              ))}
            </div>
          </section>
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>{listing.details.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>{listing.details.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-5 w-5 flex-shrink-0" />
                  <a href={`https://${listing.details.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {listing.details.website}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 flex-shrink-0" />
                  <span>{listing.details.hours}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
                ))}
              </CardContent>
            </Card>
            <div className="bg-muted rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Map Placeholder</h3>
              <p className="text-sm text-muted-foreground">An interactive map will be displayed here.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function ListingDetailSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 animate-pulse">
      <header className="mb-12">
        <Skeleton className="h-6 w-24 mb-4 rounded" />
        <Skeleton className="h-16 w-3/4 mb-4 rounded" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div>
            <Skeleton className="h-8 w-1/3 mb-4 rounded" />
            <Skeleton className="h-5 w-full mb-2 rounded" />
            <Skeleton className="h-5 w-full mb-2 rounded" />
            <Skeleton className="h-5 w-2/3 rounded" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/4 mb-6 rounded" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="w-full aspect-square rounded-lg" />
            </div>
          </div>
        </div>
        <aside className="lg:col-span-1 space-y-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </aside>
      </div>
    </div>
  );
}