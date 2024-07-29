import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const steps = [
  {
    title: 'Step 1: Ideation',
    description: 'Conceptualization of the project and initial research.',
    completed: true,
  },
  {
    title: 'Step 2: Prototyping',
    description: 'Design and development of low-fidelity prototypes for the platform.',
    completed: true,
  },
  {
    title: 'Step 3: Backend Development',
    description: 'Setup of backend architecture, database, and initial integrations.',
    completed: true,
  },
  {
    title: 'Step 4: Frontend Development',
    description: 'User interface creation in React, initial usability tests.',
    completed: false,
  },
  {
    title: 'Step 5: Social Media and Marketing',
    description: 'Establishing online presence and kick-starting marketing campaigns.',
    completed: false,
  },
  {
    title: 'Step 6: Beta Launch',
    description: 'Releasing the beta version to a selected group of users and gathering feedback.',
    completed: false,
  },
];

const RoadmapSection = () => {
  return (
    <div id="roadmap" className="full-height">
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom component="h2" sx={{ mb: 3 }}>
          Our Roadmap
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          A glimpse into our journey and where we're headed next.
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ textAlign: 'left', p: 2, borderTop: `4px solid ${step.completed ? '#2E8B57' : '#ccc'}` }}>
                <CardContent>
                  {step.completed ? (
                    <CheckCircleIcon sx={{ fontSize: '2rem', color: '#2E8B57' }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: '2rem', color: '#ccc' }} />
                  )}
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default RoadmapSection;
