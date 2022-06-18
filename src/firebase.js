import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './simpleblog-874d6-firebase-adminsdk-mj4yu-2b45a9a01d.json' assert {type: 'json'};

initializeApp({
    credential: cert(serviceAccount)
});

export const db = getFirestore();