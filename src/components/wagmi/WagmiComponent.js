import React from 'react';
import { useConnect } from 'wagmi';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const customWalletIds = ['walletConnect', 'com.trustwallet.app', 'io.metamask'];

const WagmiComponent = () => {
    const { connect, connectors, error } = useConnect();

    const filteredConnectors = connectors.filter(connector => customWalletIds.includes(connector.id));

    return (
        <Container>
            <Grid container spacing={4}>
                {filteredConnectors.map((connector, index) => (
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
            {error && (
                <Typography variant="body1" color="error" mt={2}>
                    Error: {error.message}
                </Typography>
            )}
        </Container>
    );
};

export default WagmiComponent;
