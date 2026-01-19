'use client';

import { type DashboardData, dashboardData as staticDashboardData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, BookOpen, ClipboardCheck } from "lucide-react";
import { format, addDays } from "date-fns";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-pulse">
            <div className="mb-12">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2 mt-2" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <BookOpen className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-2xl font-headline">Active Courses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                {i > 0 && <Separator />}
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Skeleton className="h-24 w-full sm:h-20 sm:w-20 rounded-md shrink-0" />
                                    <div className="flex-1 w-full space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-2 w-full" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                </div>
                                </React.Fragment>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ClipboardCheck className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-2xl font-headline">Assignments Due</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <CalendarDays className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-2xl font-headline">Upcoming Classes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {[...Array(3)].map((_, i) => (
                               <React.Fragment key={i}>
                               {i > 0 && <Separator />}
                               <div className="flex items-start gap-4">
                                   <Skeleton className="h-16 w-16 rounded-md" />
                                   <div className="flex-1 space-y-2">
                                       <Skeleton className="h-5 w-3/4" />
                                       <Skeleton className="h-4 w-1/2" />
                                   </div>
                               </div>
                               </React.Fragment>
                           ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const clientSideDashboardData: DashboardData = {
        ...staticDashboardData,
        upcomingClasses: [
            { id: "class_1", title: "Live Q&A: Color Theory", date: addDays(new Date(), 2), time: "4:00 PM" },
            { id: "class_2", title: "Critique Session: Module 2", date: addDays(new Date(), 5), time: "2:00 PM" },
            { id: "class_3", title: "Guest Lecture: Building a Brand", date: addDays(new Date(), 9), time: "6:00 PM" },
        ],
        assignments: [
            { id: "assign_1", title: "Final Illustration Submission", course: "Fashion Illustration", dueDate: addDays(new Date(), 3), status: "Due Soon" },
            { id: "assign_2", title: "Business Plan Draft", course: "The Business of Fashion", dueDate: addDays(new Date(), 10), status: "Submitted" },
            { id: "assign_3", title: "Figure Drawing Practice", course: "Fashion Illustration", dueDate: addDays(new Date(), -2), status: "Overdue" },
        ]
    };
    setDashboardData(clientSideDashboardData);
  }, []);

  if (!dashboardData) {
    return <DashboardSkeleton />;
  }

  const { activeCourses, upcomingClasses, assignments } = dashboardData;

  const getStatusBadge = (status: 'Submitted' | 'Due Soon' | 'Overdue') => {
      switch(status) {
          case 'Overdue': return 'destructive';
          case 'Due Soon': return 'secondary';
          case 'Submitted': return 'default';
          default: return 'outline';
      }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Student Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Welcome back! Here's your progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Courses */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="w-6 h-6 text-primary"/>
                <CardTitle className="text-2xl font-headline">Active Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeCourses.map((course, index) => {
                  const image = PlaceHolderImages.find(p => p.id === course.imageId);
                  return (
                    <React.Fragment key={course.id}>
                    {index > 0 && <Separator />}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {image && <div className="relative h-24 w-full sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0"><Image src={image.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={image.imageHint}/></div>}
                        <div className="flex-1 w-full">
                            <h3 className="font-medium">{course.title}</h3>
                            <Progress value={course.progress} className="mt-2 h-2" />
                            <p className="text-sm text-muted-foreground mt-1">{course.progress}% complete</p>
                        </div>
                    </div>
                    </React.Fragment>
                  )
                })}
            </CardContent>
          </Card>
          {/* Assignments Due */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <ClipboardCheck className="w-6 h-6 text-primary"/>
                <CardTitle className="text-2xl font-headline">Assignments Due</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead className="hidden md:table-cell">Course</TableHead>
                            <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assignments.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell className="hidden md:table-cell">{item.course}</TableCell>
                                <TableCell className="hidden sm:table-cell">{format(item.dueDate, 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={getStatusBadge(item.status)}>{item.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader className="flex flex-row items-center gap-4">
                    <CalendarDays className="w-6 h-6 text-primary"/>
                    <CardTitle className="text-2xl font-headline">Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingClasses.map((item, index) => (
                        <React.Fragment key={item.id}>
                        {index > 0 && <Separator />}
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center justify-center p-3 rounded-md bg-muted text-muted-foreground">
                                <span className="text-sm font-bold">{format(item.date, 'MMM')}</span>
                                <span className="text-2xl font-bold">{format(item.date, 'd')}</span>
                            </div>
                            <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                        </div>
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
