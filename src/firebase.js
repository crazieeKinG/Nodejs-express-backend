import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './simpleblog_sdk.json' assert {type: 'json'};

initializeApp({
    credential: cert(serviceAccount)
});

export const db = getFirestore();