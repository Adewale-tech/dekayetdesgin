'use server';

/**
 * @fileOverview This file defines a Genkit flow for an AI-powered styling tool.
 *
 * The flow takes user preferences and the latest fashion trends as input,
 * and provides personalized outfit recommendations.
 *
 * - `getStylingRecommendations`: A function that initiates the styling recommendation process.
 * - `StylingInput`: The input type for the `getStylingRecommendations` function.
 * - `StylingOutput`: The return type for the `getStylingRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StylingInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user’s style preferences, including preferred colors, styles, and brands.'
    ),
  latestTrends: z
    .string()
    .describe('A summary of the latest fashion trends.'),
});
export type StylingInput = z.infer<typeof StylingInputSchema>;

const StylingOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized outfit recommendations.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the recommendations.'),
});
export type StylingOutput = z.infer<typeof StylingOutputSchema>;

export async function getStylingRecommendations(
  input: StylingInput
): Promise<StylingOutput> {
  return aiStylingToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStylingToolPrompt',
  input: {schema: StylingInputSchema},
  output: {schema: StylingOutputSchema},
  prompt: `You are a personal stylist that provides fashion advice based on user preferences and latest fashion trends.

  Provide personalized outfit recommendations with detailed reasoning based on the user preferences and latest fashion trends described below.

  User Preferences: {{{userPreferences}}}
  Latest Trends: {{{latestTrends}}}
  `,
});

const aiStylingToolFlow = ai.defineFlow(
  {
    name: 'aiStylingToolFlow',
    inputSchema: StylingInputSchema,
    outputSchema: StylingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
