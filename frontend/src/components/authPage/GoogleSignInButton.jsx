import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Button } from '@mui/material';
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider().setCustomParameters({
    prompt: 'select_account'
});

provider.addScope('email');

const style = {
    GoogleLoginButton: {
        height: '3rem',
        width: '15rem',
        margin: '1rem',
        backgroundColor: 'contrast.soft',
        color: 'background.paper',
        '&:hover': {
            backgroundColor: 'contrast.main',
        },
    }
}


const GoogleSignInButton = () => {

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            await apiClient.initialize();
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Button
            variant='contained'
            startIcon={<FcGoogle style={{ marginRight: '5px' }} />}
            onClick={handleGoogleLogin}
            sx={{ ...style.GoogleLoginButton }}
        >
            Login with Google
        </Button>
    );
};

export default GoogleSignInButton;
