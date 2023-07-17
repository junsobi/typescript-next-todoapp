import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu } from 'antd';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [activePhase, setActivePhase] = useState<string>(
    typeof window !== 'undefined' ? router.pathname : '',
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePhase(router.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="flex h-auto min-h-screen relative">
      <div className="w-1/5 h-full top-0 sticky">
        <h1 className="text-xl p-4">Todo List Project</h1>
        <Menu selectedKeys={[activePhase]} mode="vertical">
          <Menu.Item key="/">
            <Link href="/" passHref>
              프로젝트 가이드라인
            </Link>
          </Menu.Item>
          <Menu.Item key="/spec">
            <Link href="/spec" passHref>
              Data Scheme & Test Scenario
            </Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" title="서버없이 만들기">
            <Menu.Item key="/usecontext">
              <Link href="/usecontext" passHref>
                Context API 이용하기
              </Link>
            </Menu.Item>
            <Menu.Item key="/recoil">
              <Link href="/recoil" passHref>
                Recoil 이용하기
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default Layout;
