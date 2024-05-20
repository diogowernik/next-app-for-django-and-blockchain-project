// files-and-folders.md

### Files and Folders

This is the file structure of the project. The project is divided into several folders, each with its own purpose. 

```
  wtree-front
  └── src
      ├── api
      │   ├── djangoAuth.js
      │   └── portfolioAssets.js
      ├── components
      │   ├── auth
      │   │   ├── buttons
      │   │   │   ├── DjangoLoginButton.js
      │   │   │   ├── DjangoLogoutButton.js
      │   │   │   ├── DjangoRegisterButton.js
      │   │   │   ├── IntegratedLoginButton.js
      │   │   │   ├── IntegratedLogoutButton.js
      │   │   │   ├── MetaMaskConnectButton.js
      │   │   │   └── MetaMaskSignOutButton.js
      │   │   ├── wrappers
      │   │   │   ├── DjangoAndMetamaskConnected.js
      │   │   │   ├── DjangoAndMetamaskDisconnected.js
      │   │   │   ├── DjangoConnected.js
      │   │   │   ├── DjangoDisconnected.js
      │   │   │   ├── MetaMaskConnected.js
      │   │   │   ├── MetaMaskConnectedAndDjangoDisco...
      │   │   │   └── MetaMaskDisconnected.js
      │   │   └── index.js
      │   ├── portfolio
      │   │   ├── radar
      │   │   ├── PortfolioAssetsColumns.js
      │   │   └── PortfolioAssetsGrid.js
      │   ├── profile
      │   │   ├── form
      │   │   │   ├── AvatarUpload.js
      │   │   │   ├── ChainSelection.js
      │   │   │   ├── CryptoSelection.js
      │   │   │   ├── DescriptionInput.js
      │   │   │   ├── MobileWrapper.js
      │   │   │   ├── UsernameInput.js
      │   │   │   ├── UsernameInputWithRedirect.js
      │   │   │   └── CreateWtreeProfile.js
      │   │   └── index.js
      ├── context
      │   ├── AuthContext.js
      │   ├── PortfolioContext.js
      ├── hooks
      │   ├── auth
      │   │   ├── django
      │   │   │   ├── useDjangoMetamaskLogin.js
      │   │   │   ├── useDjangoMetamaskRegister.js
      │   │   │   ├── useDjangoRegister.js
      │   │   │   ├── useDjangoSignIn.js
      │   │   │   ├── useDjangoSignOut.js
      │   │   │   ├── useMetamaskSignatureForDjangoLogin.js
      │   │   │   ├── useMetamaskSignatureForDjangoRegister.js
      │   │   │   └── useRequestSignature.js
      │   │   ├── metamask
      │   │   │   ├── useMetamaskConnect.js
      │   │   │   ├── useMetamaskSignOut.js
      │   │   │   └── useMetamaskUpdateStatus.js
      │   ├── fetch
      │   │   └── useFetchPortfolioAssets.js
      │   ├── grid
      │   │   ├── useDeleteAction.js
      │   │   ├── useDynamicFilters.js
      │   │   └── useGridManagement.js
      │   └── index.js
      ├── layouts
      │   ├── dashboard
      │   │   ├── DashboardNavbar.js
      │   │   ├── MainLayout.js
      │   │   ├── MenuItems.js
      │   │   └── ResponsiveDrawer.js
      │   ├── index
      │   │   ├── Introduction.js
      │   │   ├── Navbar.js
      │   ├── portfolio
      │   │   └── MainLayout.js
      ├── pages
      │   ├── dev
      │   │   └── wrappers-and-buttons.js
      │   ├── kids
      │   ├── portfolio
      │   │   ├── [portfolio_id]
      │   │   │   └── index.js
      │   │   ├── login.js
      │   │   └── register.js
      │   ├── profile
      │   │   ├── create.js
      │   │   ├── index.js
      │   │   ├── _app.js
      │   │   ├── [profile].js
      │   │   └── index.js
      │   └── portfolios.js
      ├── services
      │   ├── wallet
      │   │   ├── EventHandlers.js
      │   │   ├── index.js
      │   │   ├── WalletManager.js
      │   │   ├── Web3Initializer.js
      │   └── index.js
          ├── contract/
          │   ├── index.js
          │   ├── ContractManager.js
          │   ├── getContract.js
          │   └── config/
          │       ├── networkConfig.js
          │       └── abis/
          │           ├── TokenTransferGateway.json
│     
      ├── styles
      │   ├── global.css
      │   └── theme.js
      ├── utils
      │   ├── grid
      │   │   ├── dataGridActions.js
      │   │   ├── DeleteCellComponent.js
      │   │   ├── DeleteDialog.js
      │   │   ├── DynamicFilters.js
      │   │   ├── index.js
      │   └── request.js
```