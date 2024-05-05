// UsernameInput.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UsernameInputWithRedirect = ({ username, setUsername }) => {
    const history = useHistory();
    const [error, setError] = useState('');

    const isValidUsername = (name) => {
        // Permite apenas letras, números, hífens e sublinhados
        return /^[a-zA-Z0-9_-]+$/.test(name);
    };

    const handleChange = (event) => {
        const newUsername = event.target.value;
        if (isValidUsername(newUsername) || newUsername === "") {
            setError('');
            setUsername(newUsername);
        } else {
            setError('O apelido deve conter apenas letras, números, hífens e sublinhados.');
        }
    };

    const handleSubmit = () => {
        if (username && isValidUsername(username)) {
            history.push(`/create-profile/${username}`);
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
                    value={username}
                    onChange={handleChange}
                    style={{ width: 'calc(100% - 90px)', padding: '10px' }}
                />
                <button onClick={handleSubmit} style={{ width: '80px', marginLeft: '10px' }}>
                    Criar
                </button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <span style={{ fontWeight: 'bold' }}>Sua URL: </span>https://wtr.ee/{username || "seu-apelido"}
            </div>
        </div>
    );
};

export default UsernameInputWithRedirect;
