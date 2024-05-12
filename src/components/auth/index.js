// @components/index.js

// Importar cada botão como um módulo padrão
export { MetaMaskConnectButton } from './buttons/MetaMaskConnectButton';
export { MetaMaskSignOutButton } from './buttons/MetaMaskSignOutButton';
export { DjangoRegisterButton } from './buttons/DjangoRegisterButton';
export { DjangoLoginButton } from './buttons/DjangoLoginButton';
export { DjangoLogoutButton } from './buttons/DjangoLogoutButton'; 
export { IntegratedLoginButton } from './buttons/IntegratedLoginButton';
export { IntegratedLogoutButton } from './buttons/IntegratedLogoutButton';

// Exportando os wrappers (isto parece estar correto já)
export { MetaMaskConnected } from './wrappers/MetaMaskConnected';
export { MetaMaskDisconnected } from './wrappers/MetaMaskDisconnected';
export { DjangoConnected } from './wrappers/DjangoConnected';
export { DjangoDisconnected } from './wrappers/DjangoDisconnected';
export { DjangoAndMetamaskConnected } from './wrappers/DjangoAndMetamaskConnected';
export { DjangoAndMetamaskDisconnected } from './wrappers/DjangoAndMetamaskDisconnected';
export { MetamaskConnectedAndDjangoDisconnected } from './wrappers/MetamaskConnectedAndDjangoDisconnected';