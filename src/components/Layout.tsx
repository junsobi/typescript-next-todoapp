import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div
    className="h-screen w-screen bg-center bg-cover flex items-center justify-center"
    style={{ backgroundImage: 'url(/abstract.jpg)' }}
  >
    <div className="h-5/6 w-11/12 bg-white bg-opacity-95 rounded-3xl overflow-auto p-16">
      <h1 className="text-5xl pb-10 text-center font-bold ">ToDo List</h1>
      {children}
    </div>
  </div>
);

export default Layout;
