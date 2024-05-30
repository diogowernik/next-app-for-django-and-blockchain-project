import MainLayout from '@/layouts/dex/dashboard/MainLayout';
import { WtreeProfileCreate } from '@/components/dex/profile';
import { Box, Typography } from '@mui/material';

export default function CreateProfileForm() {
    return (
        <MainLayout>
            <Box borderBottom={1} borderColor="divider" mb={2} mt={2}>
                <Typography variant="h5" gutterBottom>
                    Create a WalletTree Profile
                </Typography> {/* Usando h5 para fonte um pouco menor */}
            </Box>
            < WtreeProfileCreate />
        </MainLayout>
    );
}