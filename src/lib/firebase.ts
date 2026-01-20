// Firebase configuration and Firestore utilities
'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, type Firestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug: Log config (without sensitive data)
if (typeof window !== 'undefined') {
    console.log('Firebase Config Loaded:', {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        hasApiKey: !!firebaseConfig.apiKey,
    });
}

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

function initFirebase() {
    if (typeof window === 'undefined') {
        throw new Error('Firebase can only be initialized on the client side');
    }

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error('Firebase configuration missing. Check your .env.local file.');
        throw new Error('Firebase configuration is incomplete');
    }

    if (getApps().length === 0) {
        console.log('Initializing Firebase app...');
        app = initializeApp(firebaseConfig);
        console.log('Firebase app initialized successfully');
    } else {
        app = getApps()[0];
        console.log('Using existing Firebase app');
    }

    db = getFirestore(app);
    console.log('Firestore initialized');

    return { app, db };
}

// Lazy initialization
function getFirestoreDb(): Firestore {
    if (!db) {
        const { db: firestore } = initFirebase();
        return firestore;
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

// Submit registration to Firestore
export async function submitRegistration(data: RegistrationData): Promise<{ success: boolean; id?: string; error?: string }> {
    console.log('Attempting to submit registration...', { courseTitle: data.courseTitle, email: data.email });

    try {
        const firestore = getFirestoreDb();

        const docData = {
            ...data,
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        };

        console.log('Saving to Firestore collection: registrations');
        const docRef = await addDoc(collection(firestore, 'registrations'), docData);

        console.log('Registration saved successfully! Document ID:', docRef.id);
        return { success: true, id: docRef.id };

    } catch (error: any) {
        console.error('Error submitting registration:', error);
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);

        // Provide user-friendly error messages
        if (error?.code === 'permission-denied') {
            return {
                success: false,
                error: 'Database access denied. Please ensure Firestore rules allow writes.'
            };
        }

        if (error?.code === 'unavailable') {
            return {
                success: false,
                error: 'Database is unavailable. Please check your internet connection.'
            };
        }

        return {
            success: false,
            error: error?.message || 'Failed to submit registration. Please try again.'
        };
    }
}

export { getFirestoreDb };
