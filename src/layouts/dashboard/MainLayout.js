// @layouts/MainLayout.js

import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';

const MainLayout = ({ children }) => {
  return (
    <ResponsiveDrawer>
      {children} 
    </ResponsiveDrawer>
  );
}

export default MainLayout;
