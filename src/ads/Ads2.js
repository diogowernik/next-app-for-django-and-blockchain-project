import React from 'react';
import { Card, CardContent } from '@mui/material';

export const Ads2 = () => {
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
                    src="/images/tree.jpeg"
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
