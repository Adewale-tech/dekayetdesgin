import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-headline text-xl font-bold">Dekayet Designs</h3>
            <p className="mt-2 text-sm text-muted-foreground">Elegance Redefined.</p>
          </div>
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/academy" className="text-muted-foreground hover:text-foreground">Academy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Facebook size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dekayet Designs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
