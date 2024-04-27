import React from 'react';
import { useContext } from 'react';
import DjangoContext from '@/context/DjangoContext';

const DjangoLogoutButton = () => {
    const { djangoSignOut } = useContext(DjangoContext);

    return <button onClick={djangoSignOut}>Logout from Django</button>;
};

export default DjangoLogoutButton;
