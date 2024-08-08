import React, { useState } from 'react';
import { TextField, Button, Card, CardHeader, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    width: '100%', // Garante que o TextField ocupe todo o espaço horizontal disponível
    marginTop: 8, // Espaçamento superior para separar dos outros componentes
    marginBottom: 8, // Espaçamento inferior para separar dos outros componentes
});

export const CreatePageInput = ({ username, setUsername, handleDashboardChange }) => {
    const [error, setError] = useState('');

    const isValidUsername = (name) => {
        // Permite apenas letras, números e pontos
        return /^[a-zA-Z0-9.]+$/.test(name);
    };

    const handleChange = (event) => {
        const newUsername = event.target.value;
        if (isValidUsername(newUsername) || newUsername === "") {
            setError('');
            setUsername(newUsername);
        } else {
            setError('O apelido deve conter apenas letras, números, hífens e pontos.');
        }
    };

    const handleSubmit = () => {
        if (username && isValidUsername(username)) {
            handleDashboardChange('create-profile');
        } else {
            setError('Por favor, insira um apelido válido.');
        }
    };

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        Create Page
                    </Typography>
                }
                subheader={
                    <Typography variant="body2">
                        Create your page to receive donations
                    </Typography>
                }
            />
            <CardContent
                sx={{ height: '130px' }}
            >
                <StyledTextField
                    label="@username"
                    variant="outlined"
                    value={username}
                    onChange={handleChange}
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        startAdornment: "@", // Adiciona o arroba na frente do campo
                    }}
                />
                <div style={{ fontWeight: 'bold', marginTop: '10px', marginLeft: '10px' }}>
                    https://wtr.ee/{username || "your.username"}
                </div>
            </CardContent>
            <CardActions
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '10px', width: '180px' }}
                >
                    Create Page
                </Button>
            </CardActions>
        </Card>
    );
};
