'use client';

import { virtualTryOnAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, CameraOff, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  message: '',
  errors: {},
  data: null,
};

export default function VirtualTryOnPage() {
  const [state, formAction, isPending] = useActionState(virtualTryOnAction, initialState as any);
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0].id);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);
  
  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleTryOn = (product: typeof products[0]) => {
    if (!videoRef.current || !canvasRef.current || !hasCameraPermission) {
        toast({ title: 'Camera not ready', description: 'Please wait for the camera to start.', variant: 'destructive' });
        return;
    }
    
    setSelectedProductId(product.id);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const userImageDataUri = canvas.toDataURL('image/jpeg');
    
    const imageId = product.images && product.images.length > 0 ? product.images[0] : undefined;
    const productImage = imageId ? PlaceHolderImages.find(p => p.id === imageId) : undefined;

    if (!productImage) {
        toast({ title: 'Product image not found', variant: 'destructive' });
        return;
    }

    const formData = new FormData();
    formData.append('userImageDataUri', userImageDataUri);
    formData.append('productImageUrl', productImage.imageUrl);
    formAction(formData);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Virtual Try-On</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See how our collection looks on you, right from your home.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {isPending && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
                    <Sparkles className="w-16 h-16 animate-pulse" />
                    <p className="mt-4 text-lg font-medium">Our AI is working its magic...</p>
                </div>
            )}
            {state.data?.generatedImageUrl && !isPending && (
                <Image src={state.data.generatedImageUrl} alt="Virtual try-on result" fill className="object-contain" />
            )}
             {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                     <CameraOff className="w-16 h-16 text-muted-foreground mb-4" />
                    <Alert variant="destructive" className="max-w-md">
                        <Camera className="h-4 w-4" />
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser to use this feature.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
            {hasCameraPermission === null && !isPending && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                     <p>Loading camera...</p>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Select a Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh]">
                        <div className="space-y-4 pr-4">
                        {products.map((product, index) => {
                            const imageId = product.images && product.images.length > 0 ? product.images[0] : undefined;
                            const image = imageId ? PlaceHolderImages.find(p => p.id === imageId) : undefined;
                            return (
                                <div key={product.id}>
                                <div  className="flex items-center gap-4">
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                                    {image ? (
                                        <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />
                                    ) : (
                                        <Skeleton className="h-full w-full" />
                                    )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{product.name}</h4>
                                        <p className="text-sm text-muted-foreground">₦{product.price.toLocaleString()}</p>
                                    </div>
                                    <Button 
                                        onClick={() => handleTryOn(product)} 
                                        disabled={isPending || hasCameraPermission !== true}
                                        size="sm"
                                        variant={selectedProductId === product.id && isPending ? 'default' : 'secondary'}
                                    >
                                        Try On
                                    </Button>
                                </div>
                                {index < products.length - 1 && <Separator className="mt-4" />}
                                </div>
                            )
                        })}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
