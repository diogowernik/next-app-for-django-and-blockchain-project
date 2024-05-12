import React from 'react';
import { useMetamaskSignatureForDjangoRegister } from '@/hooks';

export const DjangoRegisterButton = () => {
    const registerWithDjangoUsingMetamask = useMetamaskSignatureForDjangoRegister();

    return <button onClick={registerWithDjangoUsingMetamask}>Register with Django via MetaMask</button>;
};

