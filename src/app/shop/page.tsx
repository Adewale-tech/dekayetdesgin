import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";

export default function ShopPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Collection</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our curated selection of luxury fashion pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
