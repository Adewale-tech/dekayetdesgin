import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Product } from "@/lib/data";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "./ui/badge";
import { ShoppingBag } from "lucide-react";

type QuickViewDialogProps = {
  product: Product;
};

export default function QuickViewDialog({ product }: QuickViewDialogProps) {
  const imageId = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const image = imageId ? PlaceHolderImages.find(p => p.id === imageId) : undefined;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" variant="secondary">Quick View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, 50vw"
                        data-ai-hint={image.imageHint}
                    />
                )}
            </div>
            <div className="space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-headline">{product.name}</DialogTitle>
                </DialogHeader>
                <p className="text-3xl font-bold">₦{product.price.toLocaleString()}</p>
                <p className="text-muted-foreground">{product.description}</p>
                
                <div>
                    <h4 className="text-sm font-medium">Colors</h4>
                    <div className="flex gap-2 mt-2">
                        {product.colors.map(color => <Badge key={color} variant="outline">{color}</Badge>)}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium">Sizes</h4>
                    <div className="flex gap-2 mt-2">
                        {product.sizes.map(size => <Badge key={size} variant="outline">{size}</Badge>)}
                    </div>
                </div>

                <Button size="lg" className="w-full">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
