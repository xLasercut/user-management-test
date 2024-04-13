import {create} from 'zustand';
import {TGetCollectionResponseData} from '../models/collection-config-api/get-collection.ts';
import {TSubmissionType, TSubmissionWindow} from '../models/collection-config-api/common.ts';

interface TState {
  config: TGetCollectionResponseData;
  setConfig: (config: TGetCollectionResponseData) => void;
  getCollections: () => TGetCollectionResponseData;
  getSubmissionTypes: (name: string, version: string) => string[];
  getSubmissionWindows: (
    name: string,
    version: string,
    type: TSubmissionType
  ) => TSubmissionWindow[];
}

const datasetConfigApi = create<TState>((set, get) => ({
  config: [],
  setConfig: (config: TGetCollectionResponseData) => {
    return set(() => {
      return {config: config};
    });
  },
  getCollections: () => {
    return get().config;
  },
  getSubmissionTypes: (name: string, version: string) => {
    const collection = get().config.filter(item => item.name === name && item.version === version);
    if (collection.length > 0) {
      return collection[0].submission_types;
    }
    return [];
  },
  getSubmissionWindows: (
    name: string,
    version: string,
    type: TSubmissionType
  ): TSubmissionWindow[] => {
    const collection = get().config.filter(item => item.name === name && item.version === version);
    if (collection.length === 0) {
      return [];
    }
    return collection[0].submission_windows[type] || [];
  },
}));

export {datasetConfigApi};
