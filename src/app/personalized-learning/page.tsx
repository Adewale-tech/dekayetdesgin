'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { personalizedLearningPathAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: {},
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? 'Generating...' : <><Lightbulb className="mr-2 h-5 w-5" /> Find My Path</>}
    </Button>
  );
}

export default function PersonalizedLearningPage() {
  const [state, formAction] = useFormState(personalizedLearningPathAction, initialState as any);
  const { toast } = useToast();

    useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Personalized Learning Path</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let our AI guide you to the perfect fashion courses based on your skills and interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Current Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="e.g., Basic sewing, sketching"
                  required
                />
                 {state.errors?.skills && <p className="text-sm text-destructive">{state.errors.skills.join(', ')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  placeholder="e.g., Sustainable fashion, streetwear, couture"
                  required
                />
                 {state.errors?.interests && <p className="text-sm text-destructive">{state.errors.interests.join(', ')}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline">Your Recommended Path</h2>
            {state.data ? (
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle>Course Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-foreground">
                        <p>{state.data.courseRecommendations}</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="flex flex-col items-center justify-center min-h-[300px] text-center p-8 bg-card border-dashed">
                    <Lightbulb className="w-12 h-12 text-muted-foreground mb-4" />
                    <CardTitle>Your future starts here</CardTitle>
                    <CardDescription className="mt-2">
                        Fill out the form to discover your personalized learning journey.
                    </CardDescription>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
