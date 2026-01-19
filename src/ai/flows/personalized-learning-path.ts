'use server';

/**
 * @fileOverview A personalized learning path AI agent.
 *
 * - personalizedLearningPath - A function that suggests fashion design courses based on user skills and interests.
 * - PersonalizedLearningPathInput - The input type for the personalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the personalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  skills: z
    .string()
    .describe('The current skills of the user, comma separated.'),
  interests: z.string().describe('The interests of the user, comma separated.'),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const PersonalizedLearningPathOutputSchema = z.object({
  courseRecommendations: z
    .string()
    .describe('A list of recommended fashion design courses based on the user\u2019s skills and interests.'),
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized learning path recommendations for fashion design courses.

  Based on the user's skills and interests, suggest a list of suitable courses.

  Skills: {{{skills}}}
  Interests: {{{interests}}}

  Course Recommendations:`, // No complex conditionals.
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
