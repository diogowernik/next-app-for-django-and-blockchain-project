// DescriptionInput.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    width: '100%', // Garante que o TextField ocupe todo o espaço horizontal disponível
    marginBottom: 16, // Espaçamento inferior para separar dos outros componentes
});

const DescriptionInput = () => {
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <StyledTextField
            label="Describe Yourself or Your Project in a Few Words"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
        />
    );
};

export default DescriptionInput;
