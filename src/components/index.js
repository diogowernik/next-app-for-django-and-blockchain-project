// components/auth/index.js
// Importar cada botão como um módulo padrão
import MetaMaskConnectButton from './auth/buttons/MetaMaskConnectButton';
import MetaMaskSignOutButton from './auth/buttons/MetaMaskSignOutButton';
import DjangoRegisterButton from './auth/buttons/DjangoRegisterButton';
import DjangoLoginButton from './auth/buttons/DjangoLoginButton';
import DjangoLogoutButton from './auth/buttons/DjangoLogoutButton'; 
import MetaDjangoIntegratedLogin from './auth/buttons/MetaDjangoIntegratedLogin';

// Exportar os componentes
export {
  MetaMaskConnectButton,
  MetaMaskSignOutButton,
  DjangoRegisterButton,
  DjangoLoginButton,
  DjangoLogoutButton,
  MetaDjangoIntegratedLogin
};

// Exportando os wrappers (isto parece estar correto já)
export { MetaMaskConnected } from './auth/wrappers/MetaMaskConnected';
export { MetaMaskDisconnected } from './auth/wrappers/MetaMaskDisconnected';
export { DjangoConnected } from './auth/wrappers/DjangoConnected';
export { DjangoDisconnected } from './auth/wrappers/DjangoDisconnected';
