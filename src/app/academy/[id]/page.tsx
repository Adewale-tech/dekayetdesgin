import { courses } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }
  
  const image = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player */}
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden relative">
            {image ? <Image src={image.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={image.imageHint} /> : <Skeleton className="h-full w-full" />}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white/70 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Course Details */}
          <div>
            <h1 className="text-4xl font-bold font-headline">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
              <Badge variant={course.level === 'Advanced' ? 'secondary' : 'default'}>{course.level}</Badge>
              <span>By {course.instructor}</span>
              <span>Duration: {course.duration}</span>
            </div>
            <p className="mt-6 text-lg">{course.description}</p>
          </div>

          {/* Curriculum */}
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">Curriculum</h2>
            <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left">{module.title}</AccordionTrigger>
                        <AccordionContent className="prose max-w-none text-muted-foreground">
                            {module.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                <div className="border rounded-lg p-6 bg-card">
                    <h3 className="text-2xl font-bold font-headline mb-4">Enroll in this course</h3>
                    <p className="text-4xl font-bold mb-4">₦{course.price.toLocaleString()}</p>
                    <Button size="lg" className="w-full">Enroll Now</Button>
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Lifetime access</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Certificate of completion</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Expert support</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
