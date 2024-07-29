import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const IntroductionSection = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      element.style.opacity = '1';
    });
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="introduction" className="full-height">
      <Container 
        maxWidth="md" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          textAlign: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom component="h1" className="fade-in" sx={{ opacity: 0 }}>
          Wallet Tree
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'normal', mb: 2, opacity: 0 }} className="fade-in">
          A revolutionary platform that lets you create a personal wallet profile, similar to link trees, but for your various cryptocurrency wallets. Receive donations, keep track of them, and even leave messages with each transaction.
        </Typography>
        <Typography sx={{ color: 'success.main', mb: 3, opacity: 0 }} className="fade-in">
          Anticipated launch in May. Stay tuned!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => scrollToSection('#profile')}
          sx={{ maxWidth: '200px', mx: 'auto', opacity: 0 }}
          className="fade-in"
        >
          Read more
        </Button>
      </Container>
    </div>
  );
};

export default IntroductionSection;
