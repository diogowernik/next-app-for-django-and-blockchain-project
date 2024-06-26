// pages/register.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card, CardContent, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { djangoRegister, djangoLoading } = useAuth(); // Utiliza o hook para acessar o contexto
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await djangoRegister(username, password, () => {
        enqueueSnackbar('Registro realizado com sucesso.', { variant: 'success' });
        router.push('/dashboard'); // Define your redirect here
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
                <b>Register</b>
              </Typography>
              <TextField
                label="Username"
                type="text"
                placeholder="Enter Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Enter Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                disabled={djangoLoading}
                sx={{ mt: 2 }}
              >
                {djangoLoading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
