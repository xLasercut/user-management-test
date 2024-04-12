import {TUserRole} from './models/user-management-api/common.ts';

interface Role {
  role: string;
  collection?: string | null;
  organisation_code?: string | null;
}

interface User {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  do_not_delete: boolean;
  account_enabled: boolean;
  last_login_time?: string | null;
  roles: TUserRole[];
  account_disabled_time?: string | null;
  creation_time: string;
}

interface UserDetailsToUpdate {
  first_name?: string;
  last_name?: string;
  do_not_delete?: boolean;
}

interface UserToAdd {
  email: string;
  first_name: string;
  last_name: string;
  do_not_delete: boolean;
  account_enabled: boolean;
  creation_time: string;
}

export type {Role, User, UserDetailsToUpdate, UserToAdd};
