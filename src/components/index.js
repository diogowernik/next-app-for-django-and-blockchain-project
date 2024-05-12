// @components/index.js

// Importar cada botão como um módulo padrão
export { MetaMaskConnectButton } from './auth/buttons/MetaMaskConnectButton';
export { MetaMaskSignOutButton } from './auth/buttons/MetaMaskSignOutButton';
export { DjangoRegisterButton } from './auth/buttons/DjangoRegisterButton';
export { DjangoLoginButton } from './auth/buttons/DjangoLoginButton';
export { DjangoLogoutButton } from './auth/buttons/DjangoLogoutButton'; 
export { IntegratedLoginButton } from './auth/buttons/IntegratedLoginButton';
export { IntegratedLogoutButton } from './auth/buttons/IntegratedLogoutButton';

// Exportando os wrappers (isto parece estar correto já)
export { MetaMaskConnected } from './auth/wrappers/MetaMaskConnected';
export { MetaMaskDisconnected } from './auth/wrappers/MetaMaskDisconnected';
export { DjangoConnected } from './auth/wrappers/DjangoConnected';
export { DjangoDisconnected } from './auth/wrappers/DjangoDisconnected';
export { DjangoAndMetamaskConnected } from './auth/wrappers/DjangoAndMetamaskConnected';
export { DjangoAndMetamaskDisconnected } from './auth/wrappers/DjangoAndMetamaskDisconnected';
export { MetamaskConnectedAndDjangoDisconnected } from './auth/wrappers/MetamaskConnectedAndDjangoDisconnected';

export {CreateProfilePage} from './wtree-profile/CreateProfilePage';