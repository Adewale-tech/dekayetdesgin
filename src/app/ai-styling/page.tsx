'use client';

import { useFormStatus } from 'react-dom';
import { getStylingRecommendationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { useEffect, useActionState } from 'react';
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
      {pending ? 'Generating...' : <><Wand2 className="mr-2 h-5 w-5" /> Get Recommendations</>}
    </Button>
  );
}

export default function AiStylingPage() {
  const [state, formAction] = useActionState(getStylingRecommendationsAction, initialState as any);
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">AI Personal Stylist</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get personalized outfit recommendations based on your style and the latest trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Style</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userPreferences">Your Preferences</Label>
                <Textarea
                  id="userPreferences"
                  name="userPreferences"
                  placeholder="e.g., I love minimalist styles, neutral colors like beige and grey, and prefer brands like COS and Everlane."
                  rows={5}
                  required
                />
                 {state.errors?.userPreferences && <p className="text-sm text-destructive">{state.errors.userPreferences.join(', ')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="latestTrends">Latest Fashion Trends</Label>
                <Textarea
                  id="latestTrends"
                  name="latestTrends"
                  placeholder="e.g., Oversized blazers, wide-leg trousers, and chunky loafers are currently in vogue."
                  rows={5}
                  required
                />
                 {state.errors?.latestTrends && <p className="text-sm text-destructive">{state.errors.latestTrends.join(', ')}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline">Your Recommendations</h2>
            {state.data ? (
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle>Outfit Ideas</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-foreground prose-h3:font-headline prose-h3:text-foreground">
                        <p>{state.data.recommendations}</p>
                        <h3>Reasoning</h3>
                        <p>{state.data.reasoning}</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-card border-dashed">
                    <Wand2 className="w-12 h-12 text-muted-foreground mb-4" />
                    <CardTitle>Your style awaits</CardTitle>
                    <CardDescription className="mt-2">
                        Fill out the form to see what our AI stylist suggests for you.
                    </CardDescription>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
