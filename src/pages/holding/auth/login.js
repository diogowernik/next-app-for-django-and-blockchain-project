// src/pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, TextField, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/context/AuthContext'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { djangoSignIn, djangoLoading } = useAuth();  // Usando o hook customizado
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await djangoSignIn(username, password, () => {
                router.push('/dashboard');  // Direciona para o dashboard após login
            });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item lg={6} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" textAlign="center" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                label="Username"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                                disabled={djangoLoading}  // Atualizado para usar a nova variável
                                sx={{ mt: 2 }}
                            >
                                {djangoLoading ? <CircularProgress size={24} /> : 'Login'}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
