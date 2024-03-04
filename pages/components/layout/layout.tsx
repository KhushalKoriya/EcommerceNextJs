import React from 'react';
import Index from '../../home';

const Layout = (PageComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <Index>
      <PageComponent {...props} />
    </Index>
  );
};

export default Layout;
