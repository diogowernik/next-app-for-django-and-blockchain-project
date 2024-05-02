import React, { useState } from 'react';
import { Typography, Avatar, IconButton, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const AvatarUpload = ({ avatar, onAvatarChange }) => {
    const [preview, setPreview] = useState(avatar);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onAvatarChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 10px 20px' }}>
            <Typography variant="h6" style={{ alignSelf: 'flex-start', marginBottom: 10 }}>Escolha sua foto ou avatar</Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Avatar
                    src={preview || '/path/to/default/avatar.png'}
                    sx={{ width: 120, height: 120 }}
                    style={{ backgroundColor: preview ? 'transparent' : '#ccc' }}
                />
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        sx={{ position: 'absolute', right: 0, bottom: 0 }}
                    >
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Box>
        </Box>
    );
};

export default AvatarUpload;
