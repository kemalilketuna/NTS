import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

export function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const navigated = window.location.pathname !== '/';

            if (user && !navigated) {
                navigate('/projects');
            } else if (!user && navigated) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);
}