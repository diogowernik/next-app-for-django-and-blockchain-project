import React from "react";

import { supportedWallets } from "../utils/constants";
import { Card, CardContent, Typography, Container, Grid, Link, Button } from "@mui/material";

const headingText = "Supported Wallets".split("");

const Wallet = ({ name, url }) => {
  const utmURL = new URL(url);
  utmURL.searchParams.set("utm_campaign", "eip6963");
  utmURL.searchParams.set("utm_source", "eip6963.org");
  return (
    <Link href={utmURL.toString()} target="_blank" style={{ textDecoration: 'none' }}>
      <Card variant="outlined">
        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{name}</Typography>
          {/* svg de link externo  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ width: '20px', height: '20px', marginLeft: '10px' }}
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </CardContent>
      </Card>
    </Link>
  );
};

const SupportedWallets = ({ emulateAvailable, handleAddWindowProvider }) => {
  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {headingText.join('')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Link
            href="https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts"
            rel="noopener noreferrer"
            target="_blank"
          >
            Add Wallet
          </Link>
        </Typography>
        <Grid container spacing={2}>
          {supportedWallets.map((wallet) => (
            <Grid item xs={12} key={wallet.name}>
              <Wallet name={wallet.name} url={wallet.url} />
            </Grid>
          ))}
          {emulateAvailable && (
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleAddWindowProvider}>
                Emulate with wallet
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default SupportedWallets;
