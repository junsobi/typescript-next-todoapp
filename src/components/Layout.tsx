import React from 'react';
import AddTask from './AddTask';
import GradientDot from './GradientDot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="h-screen w-screen flex items-center justify-center font-light bg-gray-100 text-gray-700">
    <div className="relative h-5/6 w-11/12 max-w-3xl p-4 shadow-2xl bg-white overflow-visible">
      <div className="h-full w-full flex flex-col">
        <div className="flex-shrink-0 relative">
          <div className="h-auto pb-4 flex items-end justify-center gap-2">
            <h1 className="text-5xl  text-center font-bold">ToDo List</h1>
            <GradientDot size="3" />
          </div>
          <AddTask />
        </div>
        <div className="overflow-auto flex-grow">{children}</div>

        <div
          className="absolute bottom-0 right-0 left-0 h-4 overflow-hidden shadow-2xl"
          style={{
            boxShadow:
              '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    </div>
  </div>
);

export default Layout;
