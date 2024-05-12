import MainLayout from '@/layouts/dashboard/MainLayout';
import CreateProfilePage from '@/components/wtree-profile/CreateProfilePage';
import { Box, Typography } from '@mui/material';

export default function CreateProfileForm() {
    return (
        <MainLayout>
            <Box borderBottom={1} borderColor="divider" mb={2} mt={2}>
                <Typography variant="h5" gutterBottom>
                    Create a WalletTree Page
                </Typography> {/* Usando h5 para fonte um pouco menor */}
            </Box>
            <CreateProfilePage />
        </MainLayout>
    );
}