import {z} from 'zod';
import {UserRole} from './common.ts';

const AddRolesRequestBody = z.object({
  email: z.string().trim().min(1),
  roles: z.array(UserRole).min(1),
});

const AddRolesResponseData = z.object({
  message: z.string(),
});

type TAddRolesRequestBody = z.infer<typeof AddRolesRequestBody>;
type TAddRolesResponseData = z.infer<typeof AddRolesResponseData>;

export {AddRolesRequestBody, AddRolesResponseData};
export type {TAddRolesResponseData, TAddRolesRequestBody};
