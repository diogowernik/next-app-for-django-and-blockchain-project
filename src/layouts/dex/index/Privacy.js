import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaShieldAlt, FaEyeSlash } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';

const PrivacySection = () => {
  return (
    <div id="privacy" className="full-height">
      <Container 
        maxWidth="md" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          textAlign: 'center',
          height: '100%'
        }}
      >
        <Typography variant="h4" gutterBottom component="h2" sx={{ mb: 3 }}>
          Your Privacy is Our Priority
        </Typography>
        <Typography variant="h6" sx={{ mb: 5 }}>
          At Wallet Tree, we deeply respect your privacy. Our platform is designed to offer convenience without compromising on the confidentiality of your transactions. We employ state-of-the-art security measures to ensure that your wallet details and transactions remain private and secure at all times.
        </Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Your peace of mind is central to our mission.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <FaShieldAlt size="4em" color="#2E8B57" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Secure Encryption
                </Typography>
                <Typography variant="body1">
                  Advanced encryption techniques guard your data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <MdLock size="4em" color="#2E8B57" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Strict Confidentiality
                </Typography>
                <Typography variant="body1">
                  Your data are kept confidential and are never shared.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <FaEyeSlash size="4em" color="#2E8B57" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Private Views
                </Typography>
                <Typography variant="body1">
                  Private options ensure security. We keep it really safe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PrivacySection;
