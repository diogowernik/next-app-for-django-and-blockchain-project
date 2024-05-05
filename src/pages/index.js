// @pages/index.js

import React from 'react';
import ResponsiveAppBar from '@/layouts/index/Navbar';  // Certifique-se de que o caminho está correto
import IntroductionSection from '@/layouts/index/Introduction';  // Certifique-se de que o caminho está correto

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <main>
        <IntroductionSection />
        {/* Aqui você pode adicionar mais seções conforme necessário */}
      </main>
    </div>
  );
};

export default Home;
