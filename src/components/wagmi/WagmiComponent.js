import React, { useEffect, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const WagmiComponent = () => {
    const { connect, connectors, isConnected, error } = useConnect();
    const { address } = useAccount();
    const [clientLoaded, setClientLoaded] = useState(false);

    useEffect(() => {
        setClientLoaded(true);  // Este código irá rodar apenas no lado do cliente
        console.log("Connectors information:", connectors); // Log das informações dos connectors

        // Salvando as informações dos connectors em uma variável para melhor visualização no console
        const connectorsInfo = connectors.map(connector => ({
            id: connector.id,
            name: connector.name,
            type: connector.type,
            supportsSimulation: connector.supportsSimulation,
            icon: connector.icon,
            rkDetails: connector.rkDetails,
        }));

        console.log("Connectors Info List:", connectorsInfo);
    }, [connectors]);

    return (
        <Container>
            <Grid container spacing={4}>
                {clientLoaded && connectors.map((connector, index) => (
                    <Grid item xs={12} key={`${connector.id}-${index}`}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {connector.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {connector.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {connector.type}
                                </Typography>
                                {connector.supportsSimulation !== undefined && (
                                    <Typography variant="body2" color="text.secondary">
                                        Supports Simulation: {connector.supportsSimulation.toString()}
                                    </Typography>
                                )}
                                {connector.rkDetails && (
                                    <Typography variant="body2" color="text.secondary">
                                        RK Details: {JSON.stringify(connector.rkDetails)}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => connect({ connector })}>
                                    Connect with {connector.name}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {isConnected && address && (
                <Typography variant="body1" color="text.primary" mt={2}>
                    Wallet address: {address}
                </Typography>
            )}

            {error && (
                <Typography variant="body1" color="error" mt={2}>
                    Error: {error.message}
                </Typography>
            )}
        </Container>
    );
};

export default WagmiComponent;
