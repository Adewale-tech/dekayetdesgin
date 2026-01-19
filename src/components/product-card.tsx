import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import QuickViewDialog from "./quick-view-dialog";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Card className="group overflow-hidden border-none shadow-none bg-transparent">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    data-ai-hint={image.imageHint}
                />
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
                <QuickViewDialog product={product} />
            </div>
        </div>
        <CardContent className="p-3 text-center">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="mt-1 text-base font-semibold">₦{product.price.toLocaleString()}</p>
        </CardContent>
    </Card>
  );
}
