import { useState, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import Layout from '@/components/Layout';

interface PanelProps {
  title: string;
  children: ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        className="flex justify-between items-center w-full py-2 px-4 bg-gray-200 text-black my-2 transition-colors duration-150 hover:bg-gray-300 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-200 transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="my-node"
        unmountOnExit
      >
        <div className="border p-4 rounded-md bg-white shadow-md">
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Panel;
