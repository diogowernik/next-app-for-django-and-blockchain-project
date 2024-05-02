// NicknameInput.js
import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    width: '100%', // Garante que o TextField ocupe todo o espaço horizontal disponível
    marginTop: 8, // Espaçamento superior para separar dos outros componentes
    marginBottom: 8, // Espaçamento inferior para separar dos outros componentes
});

const NicknameInput = ({ nickname, setNickname }) => {
    const handleChange = (event) => {
        setNickname(event.target.value);
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <StyledTextField
                label="Seu apelido"
                variant="outlined"
                value={nickname}
                onChange={handleChange}
                InputProps={{
                    startAdornment: "@", // Adiciona o arroba na frente do campo
                }}
            />
            <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                https://wtr.ee/{nickname}
            </div>
        </div>
    );
};

export default NicknameInput;
