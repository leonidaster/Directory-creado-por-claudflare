import { Link, NavLink } from 'react-router-dom';
import { Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
export function Header() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-display">Zenith Directory</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/listings" className={navLinkClasses}>
            Listings
          </NavLink>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold font-display">Zenith Directory</span>
                </Link>
                <NavLink to="/" className={navLinkClasses}>
                  Home
                </NavLink>
                <NavLink to="/listings" className={navLinkClasses}>
                  Listings
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}