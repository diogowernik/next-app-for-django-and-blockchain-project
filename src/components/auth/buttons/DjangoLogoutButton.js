import React from 'react';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const DjangoLogoutButton = () => {
    const { djangoSignOut } = useContext(AuthContext);

    return <button onClick={djangoSignOut}>Logout from Django</button>;
};

export default DjangoLogoutButton;
