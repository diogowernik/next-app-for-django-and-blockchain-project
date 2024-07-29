import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ContactSection = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 5 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom component="h2">
          Wallet Tree
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Empowering the cryptocurrency community, one link at a time.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          &copy; 2023 Wallet Tree. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default ContactSection;
