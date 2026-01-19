import { dashboardData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, BookOpen, ClipboardCheck } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
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
                    <>
                    {index > 0 && <Separator />}
                    <div key={course.id} className="flex flex-col sm:flex-row items-center gap-4">
                        {image && <div className="relative h-24 w-full sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0"><Image src={image.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={image.imageHint}/></div>}
                        <div className="flex-1 w-full">
                            <h3 className="font-medium">{course.title}</h3>
                            <Progress value={course.progress} className="mt-2 h-2" />
                            <p className="text-sm text-muted-foreground mt-1">{course.progress}% complete</p>
                        </div>
                    </div>
                    </>
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
                        <>
                        {index > 0 && <Separator />}
                        <div key={item.id} className="flex items-start gap-4">
                            <div className="flex flex-col items-center justify-center p-3 rounded-md bg-muted text-muted-foreground">
                                <span className="text-sm font-bold">{format(item.date, 'MMM')}</span>
                                <span className="text-2xl font-bold">{format(item.date, 'd')}</span>
                            </div>
                            <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                        </div>
                        </>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
