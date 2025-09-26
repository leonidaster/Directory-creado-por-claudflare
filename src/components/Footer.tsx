import { Mountain, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center justify-center md:justify-start mb-6 md:mb-0">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="ml-3 text-2xl font-bold font-display">Zenith Directory</span>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zenith Directory. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with ❤��� at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}