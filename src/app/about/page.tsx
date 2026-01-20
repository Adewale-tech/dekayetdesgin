import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Gem, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Where African heritage meets contemporary elegance. We craft timeless pieces that celebrate the richness of Nigerian culture.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Dekayet Designs: Redefining African Luxury
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded with a passion for preserving and modernizing traditional Nigerian craftsmanship, 
              Dekayet Designs has become a beacon of excellence in African fashion. Our journey began 
              with a simple mission: to showcase the beauty of Adire, Aso-Oke, and Ankara to the world.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every piece in our collection tells a story — woven by skilled artisans who have 
              mastered techniques passed down through generations. We blend these time-honored 
              traditions with contemporary silhouettes, creating garments that are both culturally 
              rooted and globally relevant.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the vibrant streets of Lagos to international runways, Dekayet Designs represents 
              the new wave of African fashion — bold, sophisticated, and unapologetically authentic.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="https://picsum.photos/seed/fashiondesigner/800/1000"
              alt="Fashion designer at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none bg-transparent">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Every stitch, every pattern, every detail is crafted with precision and care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none bg-transparent">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Cultural Pride</h3>
                <p className="text-muted-foreground">
                  We celebrate our heritage and bring Nigerian artistry to the global stage.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none bg-transparent">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Excellence</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Each piece meets our highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none bg-transparent">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-muted-foreground">
                  Supporting local artisans and empowering the next generation of designers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
            Join the Dekayet Family
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're looking for the perfect outfit or want to master the art of fashion design, we're here to guide your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/academy">Learn Fashion Design</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
