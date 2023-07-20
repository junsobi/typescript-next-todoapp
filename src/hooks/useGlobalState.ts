import { atom, useRecoilState } from 'recoil';

export const globalState = atom({
  key: 'globalState',
  default: { stateManager: 'context' },
});

export const useGlobalState = () => useRecoilState(globalState);
