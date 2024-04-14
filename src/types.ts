import {TUserRole} from './models/user-management-api/common.ts';

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

interface Email {
  job_id: string
  subject: string
  template: string
  to_address: string[]
  creation_time: string
  status: string
}

export type {User, Email};
