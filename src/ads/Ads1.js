import React from 'react';
import { Card, CardContent } from '@mui/material';

export const Ads1 = () => {
    return (
        <Card>
            <CardContent
                sx={{
                    height: 278,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden' // opcional, para garantir que a imagem não vaze do card
                }}
            >
                <img
                    src="/images/welcome-card.jpeg"
                    alt="welcome-card"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain' // garante que a imagem seja ajustada dentro do container
                    }}
                />
            </CardContent>
        </Card>
    );
};
