/next_dev
  /docs
  /public                # Arquivos estáticos como imagens, favicon, etc.
  /src
    /pages               # Cada arquivo ou pasta aqui representa uma rota
      index.js           # Página inicial ('/')
      dashboard.js       # Página do Dashboard ('/dashboard')
      [username].js      # Página de perfil dinâmica ('/[username]')
      /api               # Endpoints da API interna
        /blockchains     # Lógica de interação com blockchains
        /django          # Lógica de interação com a API Django
    /components         # Componentes reutilizáveis de UI
      /common           # Componentes comuns como botões, modais, etc.
      /layout           # Componentes de layout como cabeçalho, rodapé, etc.
    /features           # Funcionalidades específicas do app
      /dashboard
        /profiles       # Componentes e páginas específicas de perfis
        /wallets        # Componentes e páginas específicas de carteiras
        /settings       # Configurações do usuário e do sistema
      /admin
        /users
        /wallets
        /profiles
    /hooks              # Hooks customizados do React
    /context            # Contextos do React para estado global
    /assets             # Recursos estáticos como estilos globais
    /utils              # Funções utilitárias compartilhadas
    /tests              # Testes unitários e de integração
  .env.local            # Variáveis de ambiente para desenvolvimento
  .env.production       # Variáveis de ambiente para produção
  next.config.js        # Configurações do Next.js
  package.json          # Gerencia dependências e scripts
  README.md             # Documentação do projeto