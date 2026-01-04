import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSuccess = async (credentialResponse) => {
        const result = await login(credentialResponse.credential);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const handleError = () => {
        setError('Google Login Failed. Please try again.');
    };

    return (
        <div className="login-wrapper">
            <div className="login-card fade-in-up">
                <div className="login-icon">🔐</div>
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Sign in with your college email to continue</p>

                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                <div className="d-flex justify-content-center mb-4">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                        size="large"
                        theme="filled_blue"
                        text="signin_with"
                        shape="pill"
                    />
                </div>

                <div className="text-center pt-3 border-top">
                    <small className="text-muted">🔒 Secured with Google OAuth 2.0</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
