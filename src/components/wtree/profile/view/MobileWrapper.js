import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    maxWidth: '400px',
    minHeight: '600px',
    margin: 'auto',
    marginTop: '60px',
    justifyContent: 'space-around',
    boxShadow: theme.shadows[5],
    borderRadius: '20px',
    padding: `${theme.spacing(2)} ${theme.spacing(2)} 60px`, // Padding inferior aumentado
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
}));


export const MobileWrapper = ({ children }) => {
    return (
        <StyledPaper elevation={3}>
            {children}
        </StyledPaper>
    );
};


