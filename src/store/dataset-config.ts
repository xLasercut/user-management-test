import {create} from 'zustand';

interface TState {}

const datasetConfigApi = create<TState>(() => ({}));

export {datasetConfigApi};
