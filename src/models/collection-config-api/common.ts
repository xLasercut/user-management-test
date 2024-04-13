import {z} from 'zod';
import {IsoTimestamp} from '../user-management-api/common.ts';

const SubmissionType = z.union([z.literal('file'), z.literal('form')]);

const SubmissionWindow = z.object({
  name: z.string().trim().min(1),
  start: IsoTimestamp,
  end: IsoTimestamp,
});

const Collection = z.object({
  name: z.string().trim().min(1),
  version: z.string().trim().min(1),
  submission_types: z.array(SubmissionType),
  submission_windows: z.record(SubmissionType, z.array(SubmissionWindow)),
});

type TSubmissionWindow = z.infer<typeof SubmissionWindow>;
type TSubmissionType = z.infer<typeof SubmissionType>;

export {Collection};
export type {TSubmissionWindow, TSubmissionType};
