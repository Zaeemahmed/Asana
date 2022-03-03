import React from 'react';
import Header from './header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
