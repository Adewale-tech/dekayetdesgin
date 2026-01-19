'use client';

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "./ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function CartSheet() {
  const [cartItems, setCartItems] = useState(products.slice(0, 2)); // Dummy data
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {cartItems.length > 0 && (
             <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartItems.length}
             </span>
          )}
          <span className="sr-only">Open shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
              {cartItems.map((item) => {
                const image = PlaceHolderImages.find(p => p.id === item.imageId);
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                      {image ? (
                        <Image
                          src={image.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      ) : <Skeleton className="h-full w-full" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <Button onClick={() => handleRemove(item.id)} variant="link" className="h-auto p-0 text-destructive hover:text-destructive/80">Remove</Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator />
            <SheetFooter className="p-6 sm:flex-col sm:gap-4 bg-background">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
            <SheetTrigger asChild>
                <Button variant="outline">Continue Shopping</Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
