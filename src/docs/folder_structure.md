
Essa é a estrutura de arquivos do projeto:

```bash

src/
├── api/
│   └── django_auth.js               # API calls related to Django authentication.
├── context/
│   ├── DjangoContext.js             # React context for Django authentication.
│   └── MetamaskContext.js           # React context for Metamask interactions.
├── docs/
│   ├── folder_structure.md   
├── hooks/
│   ├── context/
│   │   ├── django/
│   │   │   ├── useLoginWithMetamask.js     # Custom hook for Metamask login with Django.
│   │   │   ├── useRegister.js              # Custom hook for registering a new Django user.
│   │   │   ├── useRegisterWithMetamask.js  # Custom hook for Metamask registration with Django.
│   │   │   ├── useSignIn.js                # Custom hook for signing in a Django user.
│   │   │   └── useSignOut.js               # Custom hook for signing out a Django user.
│   │   └── metamask/
│   │       ├── useConnectWithMetamask.js   # Custom hook to connect Metamask.
│   │       ├── useSignOutWithMetamask.js   # Custom hook to sign out from Metamask.
│   │       └── useUpdateBalanceAndChain.js # Custom hook to update balance and chain info.
│   └── pages/
│       └── useDjangoAuth.js            # Custom hook to access Django authentication context.
├── index.js                             # Index hook.
├── layouts/
│   ├── MainLayout.js   
├── pages/
│   ├── _app.js  
│   ├── [username].js                  # Dynamic route for user profiles.
│   ├── dashboard.js                   # Dashboard page for authenticated users.
│   ├── index.js                       # The main landing page.
│   ├── login.js                       # Login page for Django authentication.
│   ├── metamask-register.js           # Page for registration and login with Metamask.
│   └── register.js                    # Registration page for new Django users.
├── services/
│   └── wallet/
│       ├── EventHandlers.js           # Event handlers for wallet actions.
│       ├── WalletManager.js           # Manages wallet interactions.
│       └── Web3Initializer.js        # Initializes web3 integration.
│   └── index.js                       # Index for services.
├── styles/
│   ├── global.css                     # Global stylesheet.
│   └── theme.js                       # Theme configuration for MUI.
└── utils/
    ├── helpers.js                     # Utility functions and helpers.
    └── request.js                     # HTTP request utility.
│   └── index.js                       # Index for utils.
.env.local
.env.production
.gitignore
jsconfig.json
next.config.mjs
package-lock.json
package.json
README.md

```