import {z} from 'zod';
import {OptionalBooleanString, OptionalIsoTimestamp} from './common.ts';

const UpdateUserResponseData = z.object({
  message: z.string().trim(),
});

const UpdateUserRequestBody = z.object({
  email: z.string().trim().min(1),
  first_name: z.string().trim().optional().nullable(),
  last_name: z.string().trim().optional().nullable(),
  account_enabled: OptionalBooleanString,
  last_login_time: OptionalIsoTimestamp,
  do_not_delete: OptionalBooleanString,
});

type TUpdateUserResponseData = z.infer<typeof UpdateUserResponseData>;
type TUpdateUserRequestBody = z.infer<typeof UpdateUserRequestBody>;

export {UpdateUserRequestBody, UpdateUserResponseData};
export type {TUpdateUserRequestBody, TUpdateUserResponseData};
