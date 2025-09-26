import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Listing } from "@shared/types";
interface ListingCardProps {
  listing: Listing;
}
export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={listing.image}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
          <Badge variant="secondary" className="w-fit mb-2 capitalize">{listing.category}</Badge>
          <h3 className="text-2xl font-bold font-display mb-2">{listing.title}</h3>
          <p className="text-muted-foreground flex-grow">{listing.summary}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-foreground">{listing.rating}</span>
            <span>({listing.reviews})</span>
          </div>
        </CardFooter>
      </Card>
    </Link>);
}