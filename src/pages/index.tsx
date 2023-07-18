import { useState, ReactNode } from 'react';
import Layout from '@/components/Layout';
import Panel from '@/components/Panel';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-100 p-10 rounded-md shadow-md">
        <h1 className="mb-8 text-3xl font-semibold text-gray-700">
          Project GuideLine
        </h1>
        <Panel title="1. 프로젝트 세팅하기">
          <Panel title="Next.js 프로젝트 초기화">
            <p>Next.js 프로젝트를 초기화하고 구성 요소를 설정합니다.</p>
          </Panel>
          <Panel title="Linter 및 Formatter 설정">
            <p>
              Linter 및 Formatter를 설정하여 코드의 일관성과 품질을 유지합니다.
            </p>
          </Panel>
          <Panel title="UI 라이브러리 (예: Tailwind) 설정">
            <p>
              UI 라이브러리를 설정하여 디자인 시스템을 구축하고 디자인 요소를
              재사용합니다.
            </p>
          </Panel>
        </Panel>
        <Panel title="2. 스펙 작성하기">
          <p>
            BDD 형식으로 스펙을 작성하여 프로젝트 명세를 구체화합니다.
            <br />
            Story?Feature?Scenario / Given - When - Then
          </p>
        </Panel>
        <Panel title="3. 데이터 모델링하기">
          <p>데이터 모델링을 수행하여 앱에서 사용되는 데이터를 정의합니다.</p>
        </Panel>
        <Panel title="4. 테스트 코드 작성하기">
          <p>
            BDD 기반으로 테스트 코드를 작성하여 프로젝트의 기능을 검증합니다.
          </p>
        </Panel>
        <Panel title="5. 서버 없이 React 기본 상태로 To-Do 리스트 만들기">
          <p>서버 없이 React를 사용하여 To-Do 리스트를 만듭니다.</p>
        </Panel>
      </div>
    </Layout>
  );
};

export default HomePage;
