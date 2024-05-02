// MobileWrapper.js
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    maxWidth: '400px', // Largura aproximada de um celular
    minHeight: '600px', // Altura aproximada de um celular
    margin: 'auto', // Centraliza na página
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: theme.shadows[5], // Sombra para dar profundidade
    borderRadius: '20px', // Bordas arredondadas para uma estética mais suave
    padding: theme.spacing(2), // Espaçamento interno
    backgroundColor: theme.palette.background.paper, // Fundo de acordo com o tema
}));

const MobileWrapper = ({ children }) => {
    return (
        <StyledPaper elevation={3}>
            {children}
        </StyledPaper>
    );
};

export default MobileWrapper;
