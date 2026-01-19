import CourseCard from "@/components/course-card";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AcademyPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === "academy-hero");

  return (
    <div>
        <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center text-white">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover opacity-40"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="relative z-10 text-center max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">The Dekayet Academy</h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                    From sketch to runway, master the art of fashion design with our expert-led courses.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="#courses">Browse Courses</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/personalized-learning">Find Your Perfect Course</Link>
                    </Button>
                </div>
            </div>
        </section>

      <section id="courses" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Our Courses</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you're a beginner or a pro, we have a course for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
