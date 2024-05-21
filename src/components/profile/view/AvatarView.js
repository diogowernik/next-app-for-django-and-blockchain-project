import React from 'react';
import { Avatar, Box } from '@mui/material';

export const AvatarView = ({ src }) => {
    return (
        <Box sx={{ 
            position: 'absolute', 
            top: '-60px', // Ajuste conforme necessário
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1 // Para garantir que o avatar esteja acima do Wrapper
        }}>
            <Avatar
                src={src || '/avatar/aang.jpeg'}
                sx={{
                    width: 120, 
                    height: 120,
                    backgroundColor: src ? 'transparent' : '#ccc',
                    border: '4px solid white', // Opcional: adiciona uma borda para estética
                    boxShadow: 3, // Opcional: adiciona uma sombra para profundidade
                }}
            />
        </Box>
    );
};
