import React from 'react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Button } from '@mui/material';
import { FaGithub } from "react-icons/fa6";

const provider = new GithubAuthProvider().setCustomParameters({
    prompt: 'select_account'
});

const style = {
    GithubLoginButton: {
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


const GithubSignInButton = () => {

    const handleGithubLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            await apiClient.initialize();
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button
                variant='contained'
                startIcon={<FaGithub style={{ marginRight: '5px' }} />}
                onClick={handleGithubLogin}
                sx={style.GithubLoginButton}
            >
                Login with Github
            </Button>
        </>
    );
};

export default GithubSignInButton;
