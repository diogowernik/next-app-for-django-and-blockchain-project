import { WtreeProfileCreate } from '@/components/profile/WtreeProfileCreate';         
import { Box, Grid, Typography } from '@mui/material';

export const CreateProfileDashboard = () => {
    return (
        <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box borderBottom={1} borderColor="divider" mb={2} mt={2}>
                <Typography variant="h5" gutterBottom>
                    Create a WalletTree Profile
                </Typography> {/* Usando h5 para fonte um pouco menor */}
            </Box>
            < WtreeProfileCreate /> 
        </Grid>
    );
}