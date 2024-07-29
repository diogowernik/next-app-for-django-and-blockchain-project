import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

const ProfileSection = () => {
  const theme = useTheme();

  return (
    <div id="profile" className="full-height">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom component="h2" sx={{ mb: 3 }}>
              Your Customized Profile
            </Typography>
            <Typography variant="h6" sx={{ mb: 5 }}>
              Here, you'll be able to create unique profiles tailored to your cryptocurrency needs. Easily display all your wallet addresses in one place, making it simpler for others to send you funds or for you to keep track of multiple assets.
            </Typography>
            <Box sx={{ textAlign: 'left', mt: 5 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Share Your Unique Link
              </Typography>
              <Typography sx={{ mb: 5 }}>
                Once you've set up your profile, you'll receive a unique and customizable link. Share this link across social platforms, websites, or anywhere you'd like others to see your wallet addresses.
              </Typography>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main }}>
                  Your Link: https://wtr.ee/username
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img src="/avatar-profile.png" alt="User's profile" style={{ width: '100%', borderRadius: '10px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfileSection;
