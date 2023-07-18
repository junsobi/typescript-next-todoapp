import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string | undefined;
  name: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    path: '/',
    name: '프로젝트 가이드라인',
  },
  {
    path: '/spec',
    name: 'Data Scheme & Test Scenario',
  },
  {
    path: undefined,
    name: '서버없이 만들기',
    subItems: [
      {
        path: '/usecontext',
        name: 'Context API',
      },
      {
        path: '/recoil',
        name: 'Recoil',
      },
    ],
  },
];

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [activePhase, setActivePhase] = useState<string>(
    typeof window !== 'undefined' ? router.pathname : '',
  );

  const [isHovering, setHovering] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePhase(router.pathname);
    }
  }, [router.pathname]);

  const getItemClassName = (item: NavItem) => {
    let className =
      'text-gray-800 hover:bg-gray-100 p-4  rounded cursor-pointer flex justify-between items-center relative z-50';
    if (
      activePhase === item.path ||
      item.subItems?.some((subItem) => subItem.path === activePhase)
    ) {
      className =
        'bg-blue-400 text-white p-4 rounded  cursor-pointer flex justify-between items-center relative z-50';
    } else if (item.name === isHovering) {
      className =
        'bg-gray-100 text-gray-800 p-4 rounded   cursor-pointer flex justify-between items-center relative z-50';
    }
    return className;
  };

  return (
    <div className="flex h-auto min-h-screen bg-gray-50">
      <div className="w-1/5 h-full sticky top-0 flex flex-col bg-gray-50 z-20">
        <h1 className="text-xl mb-4 p-4">Todo List Project</h1>
        <ul className="flex flex-col gap-4">
          {navItems.map((item) => (
            <li
              key={item.name}
              onMouseEnter={() => setHovering(item.name)}
              onMouseLeave={() => setHovering('')}
              className="relative z-0"
            >
              <Link href={item.path || '#'}>
                <div className={getItemClassName(item)}>
                  {item.name}
                  {item.subItems && <AiOutlineRight />}
                </div>
              </Link>
              {item.subItems && isHovering === item.name && (
                <div className="absolute w-full right-0 top-0 translate-x-full bg-gray-50 p-2 shadow-lg z-50 rounded">
                  {' '}
                  <ul className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link href={subItem.path as string} key={subItem.name}>
                        <div className={getItemClassName(subItem)}>
                          {subItem.name}
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/5 relative z-10 bg-white">{children}</div>
    </div>
  );
};

export default Layout;
