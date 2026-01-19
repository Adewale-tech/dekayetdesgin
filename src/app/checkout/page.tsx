import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 text-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-headline">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This is a placeholder for the secure multi-step checkout flow.
            In a real application, this would integrate with a payment provider like Paystack or Flutterwave.
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
