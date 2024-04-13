import {z} from 'zod';
import {Collection} from './common.ts';

const GetCollectionResponseData = z.array(Collection);

type TGetCollectionResponseData = z.infer<typeof GetCollectionResponseData>;

export {GetCollectionResponseData};
export type {TGetCollectionResponseData};
