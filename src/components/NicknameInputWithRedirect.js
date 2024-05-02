// NicknameInput.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NicknameInputWithRedirect = ({ nickname, setNickname }) => {
    const history = useHistory();
    const [error, setError] = useState('');

    const isValidNickname = (name) => {
        // Permite apenas letras, números, hífens e sublinhados
        return /^[a-zA-Z0-9_-]+$/.test(name);
    };

    const handleChange = (event) => {
        const newNickname = event.target.value;
        if (isValidNickname(newNickname) || newNickname === "") {
            setError('');
            setNickname(newNickname);
        } else {
            setError('O apelido deve conter apenas letras, números, hífens e sublinhados.');
        }
    };

    const handleSubmit = () => {
        if (nickname && isValidNickname(nickname)) {
            history.push(`/create-profile/${nickname}`);
        } else {
            setError('Por favor, insira um apelido válido.');
        }
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Seu apelido"
                    value={nickname}
                    onChange={handleChange}
                    style={{ width: 'calc(100% - 90px)', padding: '10px' }}
                />
                <button onClick={handleSubmit} style={{ width: '80px', marginLeft: '10px' }}>
                    Criar
                </button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <span style={{ fontWeight: 'bold' }}>Sua URL: </span>https://wtr.ee/{nickname || "seu-apelido"}
            </div>
        </div>
    );
};

export default NicknameInputWithRedirect;
