import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {/* Hero Section */}
      <section className="w-full h-[80vh] relative flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white space-y-4 p-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-headline">
            Elegance Redefined
          </h1>
          <p className="max-w-xl mx-auto text-lg text-white/90">
            Discover a world where luxury meets timeless style.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Featured Collection</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Curated pieces from our latest arrivals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
                <Link href="/shop">View All Products</Link>
            </Button>
        </div>
      </section>
      
      {/* Academy CTA */}
      <section className="w-full bg-card py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold">Dekayet Fashion Academy</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock your creative potential. Enroll in our world-class fashion design courses and start your journey today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/academy">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/personalized-learning">Find Your Path</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
