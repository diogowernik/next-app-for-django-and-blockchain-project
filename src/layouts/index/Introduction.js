// @layouts/landing_page/Introduction.js

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const IntroductionSection = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom component="h1">
        Wallet Tree
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'normal', mb: 2 }}>
        A revolutionary platform that lets you create a personal wallet profile, similar to link trees, but for your various cryptocurrency wallets. Receive donations, keep track of them, and even leave messages with each transaction.
      </Typography>
      <Typography sx={{ color: 'success.main', mb: 3 }}>
        Anticipated launch in May. Stay tuned!
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Read more
      </Button>
    </Container>
  );
};

export default IntroductionSection;
