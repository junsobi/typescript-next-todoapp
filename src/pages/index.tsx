import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Collapse } from 'antd';
import Layout from '@/components/Layout';

const { Panel } = Collapse;

const HomePage: FC = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="w-full p-10">
          <h1 className="mb-8 text-3xl">Project GuideLine</h1>
          <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6']}>
            <Panel header="1. 프로젝트 세팅하기" key="1">
              <Collapse>
                <Panel header="Next.js 프로젝트 초기화" key="1">
                  <p>Next.js 프로젝트를 초기화하고 구성 요소를 설정합니다.</p>
                </Panel>
                <Panel header="Linter 및 Formatter 설정" key="2">
                  <p>
                    Linter 및 Formatter를 설정하여 코드의 일관성과 품질을
                    유지합니다.
                  </p>
                </Panel>
                <Panel header="UI 라이브러리 (예: Tailwind) 설정" key="3">
                  <p>
                    UI 라이브러리를 설정하여 디자인 시스템을 구축하고 디자인
                    요소를 재사용합니다.
                  </p>
                </Panel>
              </Collapse>
            </Panel>

            <Panel header="2. 스펙 작성하기" key="3">
              <p>
                BDD 형식으로 스펙을 작성하여 프로젝트 명세를 구체화합니다.
                <br />
                Story?Feature?Scenario / Given - When - Then
              </p>
            </Panel>
            <Panel header="3. 데이터 모델링하기" key="5">
              <p>
                데이터 모델링을 수행하여 앱에서 사용되는 데이터를 정의합니다.
              </p>
            </Panel>
            <Panel header="4. 테스트 코드 작성하기" key="4">
              <p>
                BDD 기반으로 테스트 코드를 작성하여 프로젝트의 기능을
                검증합니다.
              </p>
            </Panel>

            <Panel
              header="5. 서버 없이 React 기본 상태로 To-Do 리스트 만들기"
              key="6"
            >
              <p>서버 없이 React를 사용하여 To-Do 리스트를 만듭니다.</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
