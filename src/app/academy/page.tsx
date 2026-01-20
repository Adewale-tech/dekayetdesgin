'use client';

import CourseCard from "@/components/course-card";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import RegistrationModal from "@/components/registration-modal";

export default function AcademyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroImage = PlaceHolderImages.find(p => p.id === "academy-hero");

  // Get featured course for hero CTA
  const featuredCourse = courses[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Viewport */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            quality={90}
            data-ai-hint="fashion design studio atelier"
          />
        )}

        {/* Charcoal Overlay (#2C2C2C at 40% opacity) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(44, 44, 44, 0.6)' }}
        />

        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          {/* Georgia Serif Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The Dekayet Academy
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            From sketch to runway, master the art of fashion design with our world-class,
            expert-led courses. Transform your passion into a thriving career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Primary CTA - Gold */}
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8962E] text-white font-semibold px-8 py-6 text-lg transition-all duration-300 shadow-lg shadow-[#D4AF37]/30"
            >
              Apply for Admission
            </Button>

            {/* Secondary CTA - White Outline */}
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] font-semibold px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="#courses">View Details</a>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section id="courses" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Courses
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you're starting your fashion journey or refining your expertise,
            our carefully curated programs will elevate your skills to professional standards.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Why Choose Dekayet Academy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Expert Instructors */}
            <div className="text-center p-8 rounded-2xl bg-[#2C2C2C]/30 border border-[#D4AF37]/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Instructors</h3>
              <p className="text-gray-400">Learn from industry professionals with decades of experience in Nigerian and international fashion.</p>
            </div>

            {/* Flexible Learning */}
            <div className="text-center p-8 rounded-2xl bg-[#2C2C2C]/30 border border-[#D4AF37]/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Flexible Learning</h3>
              <p className="text-gray-400">Choose between in-person sessions at our Lagos studio or learn online at your own pace.</p>
            </div>

            {/* Industry Certification */}
            <div className="text-center p-8 rounded-2xl bg-[#2C2C2C]/30 border border-[#D4AF37]/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Industry Certification</h3>
              <p className="text-gray-400">Earn recognized credentials that open doors to careers in fashion design and business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal for Hero CTA */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={featuredCourse.id}
        courseTitle="Dekayet Academy Program"
        coursePrice={0}
      />
    </div>
  );
}
