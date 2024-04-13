import {create} from 'zustand';

interface TState {
  test: string
}

const emailNotificationApi = create<TState>(() => ({
  test: ''
}));

export {emailNotificationApi};
