'use client';

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Course } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import RegistrationModal from "./registration-modal";

type CourseCardProps = {
    course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const image = PlaceHolderImages.find(p => p.id === course.imageId);

    // Format price in Nigerian Naira
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 bg-[#1a1a2e]/80 border-[#D4AF37]/20 backdrop-blur-sm">
                <CardHeader className="p-0 relative h-56 bg-muted">
                    {image ? (
                        <Image
                            src={image.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={image.imageHint}
                            loading="lazy"
                        />
                    ) : (
                        <Skeleton className="h-full w-full" />
                    )}
                    {/* Gold level badge - top left */}
                    <Badge
                        className="absolute top-4 left-4 bg-[#D4AF37] text-white border-none font-semibold px-3 py-1"
                    >
                        {course.level}
                    </Badge>
                </CardHeader>

                <CardContent className="p-6 flex-grow">
                    {/* Serif title */}
                    <CardTitle className="text-xl font-serif text-white mb-2">{course.title}</CardTitle>
                    <p className="text-sm text-gray-400 mb-4">By {course.instructor}</p>

                    {/* Duration */}
                    <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>

                    {/* Price in Gold */}
                    <div className="text-2xl font-bold text-[#D4AF37]">
                        {formatPrice(course.price)}
                    </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                    {/* Primary CTA - Gold */}
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white font-semibold transition-all duration-300"
                    >
                        Apply for Admission
                    </Button>

                    {/* Secondary CTA - Outline */}
                    <Button
                        variant="outline"
                        className="w-full border-white/50 text-white hover:bg-white hover:text-[#2C2C2C] transition-all duration-300"
                        asChild
                    >
                        <a href={`/academy/${course.id}`}>View Details</a>
                    </Button>
                </CardFooter>
            </Card>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseId={course.id}
                courseTitle={course.title}
                coursePrice={course.price}
            />
        </>
    );
}
