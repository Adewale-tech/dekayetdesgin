// Firebase configuration and Firestore utilities
'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    Firestore,
    connectFirestoreEmulator
} from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Singleton instances
let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

// Initialize Firebase
function getFirebaseApp(): FirebaseApp {
    if (firebaseApp) {
        return firebaseApp;
    }

    if (getApps().length > 0) {
        firebaseApp = getApps()[0];
        return firebaseApp;
    }

    // Validate config
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error('Firebase config missing:', {
            hasApiKey: !!firebaseConfig.apiKey,
            hasProjectId: !!firebaseConfig.projectId,
        });
        throw new Error('Firebase configuration is missing. Please check .env.local file.');
    }

    console.log('Initializing Firebase with project:', firebaseConfig.projectId);
    firebaseApp = initializeApp(firebaseConfig);
    return firebaseApp;
}

// Get Firestore instance
function getFirestoreInstance(): Firestore {
    if (firestoreDb) {
        return firestoreDb;
    }

    const app = getFirebaseApp();
    firestoreDb = getFirestore(app);
    console.log('Firestore connected to project:', firebaseConfig.projectId);
    return firestoreDb;
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

// Submit registration to Firestore
export async function submitRegistration(
    data: RegistrationData
): Promise<{ success: boolean; id?: string; error?: string }> {

    console.log('=== Starting Registration Submission ===');
    console.log('Course:', data.courseTitle);
    console.log('Email:', data.email);

    try {
        // Get Firestore instance
        const db = getFirestoreInstance();

        // Prepare document data (convert Date to ISO string for Firestore)
        const docData = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            deliveryMethod: data.deliveryMethod,
            experienceLevel: data.experienceLevel,
            careerGoals: data.careerGoals,
            courseId: data.courseId,
            courseTitle: data.courseTitle,
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            status: 'pending',
        };

        console.log('Attempting to save to Firestore...');

        // Add document to registrations collection
        const registrationsRef = collection(db, 'registrations');
        const docRef = await addDoc(registrationsRef, docData);

        console.log('=== Registration Saved Successfully ===');
        console.log('Document ID:', docRef.id);

        return {
            success: true,
            id: docRef.id
        };

    } catch (error: any) {
        console.error('=== Registration Failed ===');
        console.error('Error Type:', error?.name);
        console.error('Error Code:', error?.code);
        console.error('Error Message:', error?.message);
        console.error('Full Error:', error);

        // Return specific error messages based on error code
        let errorMessage = 'Failed to submit registration. Please try again.';

        if (error?.code === 'permission-denied') {
            errorMessage = 'Access denied. Firestore security rules need to allow writes. Please update Firestore rules in Firebase Console.';
        } else if (error?.code === 'unavailable') {
            errorMessage = 'Database unavailable. Please check your internet connection.';
        } else if (error?.code === 'not-found') {
            errorMessage = 'Database not found. Please create Firestore database in Firebase Console.';
        } else if (error?.message) {
            errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}

export { getFirestoreInstance };
