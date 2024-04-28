import { useSnackbar } from 'notistack';
import { useAuth } from '@/context/AuthContext';
import { djangoMetamaskLogin } from '@/api/django_auth';

export const useIntegratedMetamaskDjangoLogin = (setToken, setIsMetamaskAuthenticated, setIsDjangoAuthenticated, setUserAddress, setLoading) => {
    const { metamaskConnect, getSignature } = useAuth(); // Supondo que getSignature esteja disponível aqui
    const { enqueueSnackbar } = useSnackbar();

    const integratedLogin = async () => {
        console.log("Iniciando o processo de login integrado...");

        setLoading(true);
        try {
            console.log("Conectando com MetaMask...");
            const address = await metamaskConnect();
            if (address) {
                console.log("Conexão com MetaMask bem-sucedida, endereço:", address);
                localStorage.setItem('userAddress', address);
                setIsMetamaskAuthenticated(true);
                setUserAddress(address);
                enqueueSnackbar('Connected with MetaMask successfully!', { variant: 'success' });

                const signature = await getSignature(address);
                console.log("Obtida a assinatura:", signature);
                console.log("Tentando fazer login no Django com endereço e assinatura...");
                const response = await djangoMetamaskLogin(address, signature);
                if (response && response.token) {
                    console.log("Login no Django bem-sucedido, token recebido.");
                    localStorage.setItem('token', response.token);
                    setToken(response.token);
                    setIsDjangoAuthenticated(true);
                    enqueueSnackbar('Login with MetaMask and Django successful!', { variant: 'success' });
                } else {
                    console.log("Login no Django falhou.");
                    setIsDjangoAuthenticated(false);
                    enqueueSnackbar('MetaMask login failed.', { variant: 'error' });
                }
            } else {
                setIsMetamaskAuthenticated(false);
                enqueueSnackbar('Failed to connect with MetaMask.', { variant: 'error' });
            }
        } catch (error) {
            console.error("Erro durante o processo de login integrado:", error);
            enqueueSnackbar(error.message || 'Failed to integrate MetaMask and Django login.', { variant: 'error' });
            setIsMetamaskAuthenticated(false);
            setIsDjangoAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    return integratedLogin;
};
