import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import apiClient from './apiClient';

const createFileFromBlob = async (url, filename) => {
    try {
        const response = await axios.get(url, {
            responseType: 'blob',
        });
        var blob = response.data;
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } catch (error) {
        if (!(error instanceof TypeError)) {
            console.error(error);
        }
        return null;
    }
};

const signOutFromApp = async () => {
    try {
        await apiClient.signOut();
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};

export { createFileFromBlob, signOutFromApp };