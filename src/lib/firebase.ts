// Firebase configuration and Firestore utilities
// This module provides a mock implementation for development
// Replace with actual Firebase config for production

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, type Firestore } from 'firebase/firestore';

// Firebase configuration - replace with your project credentials
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abc123',
};

// Initialize Firebase only if not already initialized
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function getFirebaseApp(): FirebaseApp | null {
    if (typeof window === 'undefined') return null;

    if (!app && getApps().length === 0) {
        try {
            app = initializeApp(firebaseConfig);
        } catch (error) {
            console.warn('Firebase initialization failed, using mock mode:', error);
            return null;
        }
    } else if (!app) {
        app = getApps()[0];
    }
    return app;
}

function getFirestoreDb(): Firestore | null {
    if (!db) {
        const firebaseApp = getFirebaseApp();
        if (firebaseApp) {
            db = getFirestore(firebaseApp);
        }
    }
    return db;
}

// Registration form data type
export interface RegistrationData {
    fullName: string;
    email: string;
    phone: string;
    deliveryMethod: 'in-person' | 'online';
    experienceLevel: 'beginner' | 'intermediate' | 'professional';
    careerGoals: string;
    courseId: string;
    courseTitle: string;
    submittedAt: Date;
}

// Submit registration to Firestore (or mock for development)
export async function submitRegistration(data: RegistrationData): Promise<{ success: boolean; id?: string; error?: string }> {
    const firestore = getFirestoreDb();

    // If Firestore is available, save to database
    if (firestore) {
        try {
            const docRef = await addDoc(collection(firestore, 'registrations'), {
                ...data,
                submittedAt: new Date(),
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error submitting registration:', error);
            return { success: false, error: 'Failed to submit registration' };
        }
    }

    // Mock implementation for development (no Firebase configured)
    console.log('Mock registration submission:', data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock success with generated ID
    return {
        success: true,
        id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
}

export { getFirebaseApp, getFirestoreDb };
