// Firebase configuration and Firestore utilities
'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    Firestore
} from 'firebase/firestore';

// Firebase configuration - uses env vars with fallback to hardcoded values
// This ensures the app works both locally and in production
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCe1iSJWnsBXwyVsP0x5FRyPmUPaNFBDN8',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'studio-1129591673-c71d7.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'studio-1129591673-c71d7',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'studio-1129591673-c71d7.firebasestorage.app',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '750437685627',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:750437685627:web:260685e1a6cf44932605de',
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
    console.log('Firestore connected');
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

    console.log('Submitting registration for:', data.email);

    try {
        // Get Firestore instance
        const db = getFirestoreInstance();

        // Prepare document data
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

        // Add document to registrations collection
        const registrationsRef = collection(db, 'registrations');
        const docRef = await addDoc(registrationsRef, docData);

        console.log('Registration saved with ID:', docRef.id);

        return {
            success: true,
            id: docRef.id
        };

    } catch (error: any) {
        console.error('Firebase Error:', error?.code || error?.message || error);

        let errorMessage = 'Failed to submit. Please try again.';

        if (error?.code === 'permission-denied') {
            errorMessage = 'Database access denied. Please update Firestore security rules in Firebase Console to allow writes.';
        } else if (error?.code === 'unavailable') {
            errorMessage = 'Database unavailable. Check your internet connection.';
        } else if (error?.code === 'not-found') {
            errorMessage = 'Database not found. Create Firestore database in Firebase Console first.';
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
