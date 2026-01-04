import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Alert } from 'react-bootstrap';

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
        setError('Google Login Failed');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Card className="p-4 shadow text-center" style={{ width: '400px' }}>
                <h2 className="mb-4">Welcome Back</h2>
                <p className="text-muted mb-4">Please sign in with your college email.</p>

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-flex justify-content-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                    />
                </div>
            </Card>
        </Container>
    );
};

export default Login;
