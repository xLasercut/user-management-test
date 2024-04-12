import {z} from 'zod';
import {UserRole} from './common';

const DeleteRolesRequestBody = z.object({
  email: z.string().trim().min(1),
  roles: z.array(UserRole).min(1),
});

const DeleteRolesResponseData = z.object({
  message: z.string(),
});

type TDeleteRolesRequestBody = z.infer<typeof DeleteRolesRequestBody>;
type TDeleteRolesResponseData = z.infer<typeof DeleteRolesResponseData>;

export {DeleteRolesResponseData, DeleteRolesRequestBody};
export type {TDeleteRolesResponseData, TDeleteRolesRequestBody};
