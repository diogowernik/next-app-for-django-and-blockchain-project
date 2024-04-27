import React from 'react';
import { useMetamaskDjangoRegister } from '@/hooks';

const DjangoRegisterButton = () => {
    const registerWithDjangoUsingMetamask = useMetamaskDjangoRegister();

    return <button onClick={registerWithDjangoUsingMetamask}>Register with Django via MetaMask</button>;
};

export default DjangoRegisterButton;
