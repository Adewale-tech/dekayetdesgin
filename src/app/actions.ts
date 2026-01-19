'use server';

import { getStylingRecommendations } from '@/ai/flows/ai-styling-tool';
import { personalizedLearningPath } from '@/ai/flows/personalized-learning-path';
import { virtualTryOn } from '@/ai/flows/virtual-try-on';
import { z } from 'zod';

const stylingSchema = z.object({
  userPreferences: z.string().min(10, { message: 'Please describe your preferences in more detail.' }),
  latestTrends: z.string().min(10, { message: 'Please describe the latest trends in more detail.' }),
});

export async function getStylingRecommendationsAction(prevState: any, formData: FormData) {
  const validatedFields = stylingSchema.safeParse({
    userPreferences: formData.get('userPreferences'),
    latestTrends: formData.get('latestTrends'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null
    };
  }

  try {
    const result = await getStylingRecommendations(validatedFields.data);
    return { message: 'success', data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while getting recommendations.', errors: {}, data: null };
  }
}

const learningPathSchema = z.object({
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  interests: z.string().min(3, { message: 'Please list at least one interest.' }),
});

export async function personalizedLearningPathAction(prevState: any, formData: FormData) {
  const validatedFields = learningPathSchema.safeParse({
    skills: formData.get('skills'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null
    };
  }
  
  try {
    const result = await personalizedLearningPath(validatedFields.data);
    return { message: 'success', data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating your learning path.', errors: {}, data: null };
  }
}

const virtualTryOnSchema = z.object({
    userImageDataUri: z.string(),
    productImageUrl: z.string().url(),
  });
  
  export async function virtualTryOnAction(prevState: any, formData: FormData) {
      const validatedFields = virtualTryOnSchema.safeParse({
          userImageDataUri: formData.get('userImageDataUri'),
          productImageUrl: formData.get('productImageUrl'),
      });
  
      if (!validatedFields.success) {
          return {
          message: 'Invalid input for virtual try-on.',
          errors: validatedFields.error.flatten().fieldErrors,
          data: null
          };
      }
      
      try {
          const result = await virtualTryOn(validatedFields.data);
          return { message: 'success', data: result, errors: {} };
      } catch (error) {
          console.error(error);
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
          return { message: `An error occurred during virtual try-on: ${errorMessage}`, errors: {}, data: null };
      }
  }
