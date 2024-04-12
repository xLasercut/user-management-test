import {z} from 'zod';
import {
  BooleanString,
  IsoTimestamp,
  OptionalBooleanString,
  OptionalIsoTimestamp,
  UserRole,
} from './common';

const GetUserResponseData = z.object({
  email: z.string().trim().min(1),
  first_name: z.string().trim().optional().nullable(),
  last_name: z.string().trim().optional().nullable(),
  account_enabled: BooleanString,
  last_login_time: OptionalIsoTimestamp,
  account_disabled_time: OptionalIsoTimestamp,
  roles: z.array(UserRole),
  creation_time: IsoTimestamp,
  do_not_delete: BooleanString,
});

const GetUserRequestParams = z.object({
  email: z.string().trim().optional().nullable(),
  organisation_code: z.string().trim().optional().nullable(),
  account_enabled: OptionalBooleanString,
});

type TGetUserResponseData = z.infer<typeof GetUserResponseData>;
type TGetUserRequestParams = z.infer<typeof GetUserRequestParams>;

export {GetUserResponseData, GetUserRequestParams};
export type {TGetUserResponseData, TGetUserRequestParams};
