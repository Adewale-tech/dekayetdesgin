'use server';

/**
 * @fileOverview A Genkit flow for a virtual try-on feature.
 *
 * This flow takes a user's image and a product image and generates an image
 * of the user wearing the product.
 *
 * - `virtualTryOn`: A function that initiates the virtual try-on process.
 * - `VirtualTryOnInput`: The input type for the `virtualTryOn` function.
 * - `VirtualTryOnOutput`: The return type for the `virtualTryOn` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VirtualTryOnInputSchema = z.object({
  userImageDataUri: z
    .string()
    .describe(
      "A snapshot of the user from their webcam, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productImageUrl: z
    .string()
    .url()
    .describe('The public URL of the product image to try on.'),
});
export type VirtualTryOnInput = z.infer<typeof VirtualTryOnInputSchema>;

const VirtualTryOnOutputSchema = z.object({
  generatedImageUrl: z
    .string()
    .describe(
      'The generated image of the user wearing the product, as a data URI.'
    ),
});
export type VirtualTryOnOutput = z.infer<typeof VirtualTryOnOutputSchema>;

async function imageUrlToDataUri(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${contentType};base64,${base64}`;
}


export async function virtualTryOn(
  input: VirtualTryOnInput
): Promise<VirtualTryOnOutput> {
  return virtualTryOnFlow(input);
}

const virtualTryOnFlow = ai.defineFlow(
  {
    name: 'virtualTryOnFlow',
    inputSchema: VirtualTryOnInputSchema,
    outputSchema: VirtualTryOnOutputSchema,
  },
  async ({ userImageDataUri, productImageUrl }) => {

    const productImageDataUri = await imageUrlToDataUri(productImageUrl);

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        { media: { url: userImageDataUri } },
        { media: { url: productImageDataUri } },
        {
          text: 'You are a virtual try-on assistant. Superimpose the clothing item from the second image (the product) onto the person in the first image (the user). The output image should realistically show the user wearing the clothing, preserving the user\'s original pose and the background. The clothing should fit naturally. Output only the generated image.',
        },
      ],
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to produce an image.');
    }
    
    return { generatedImageUrl: media.url };
  }
);
