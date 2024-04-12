import {z} from 'zod';
import {OptionalBooleanString} from "./common.ts";


const CreateUserResponseData = z.object({
  message: z.string().trim(),
});

const CreateUserRequestBody = z.object({
  email: z.string().trim().min(1),
  first_name: z.string().trim().optional().nullable(),
  last_name: z.string().trim().optional().nullable(),
  account_enabled: OptionalBooleanString,
});

type TCreateUserResponseData = z.infer<typeof CreateUserResponseData>;
type TCreateUserRequestBody = z.infer<typeof CreateUserRequestBody>;

export {CreateUserRequestBody, CreateUserResponseData};
export type {TCreateUserRequestBody, TCreateUserResponseData};
