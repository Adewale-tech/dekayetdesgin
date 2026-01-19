import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Course } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(p => p.id === course.imageId);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0 relative h-56 bg-muted">
             {image ? (
                <Image
                    src={image.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={image.imageHint}
                />
            ): <Skeleton className="h-full w-full" />}
            <Badge className="absolute top-4 right-4" variant={course.level === 'Advanced' ? 'secondary' : 'default'}>{course.level}</Badge>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
            <CardTitle className="text-xl font-headline mb-2">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">By {course.instructor}</p>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
                <Clock className="w-4 h-4"/>
                <span>{course.duration}</span>
            </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
            <Button asChild className="w-full">
                <Link href={`/academy/${course.id}`}>View Course</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
