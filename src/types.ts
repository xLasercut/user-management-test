interface Role {
  role: string;
  collection: string;
  organisation_code: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
  do_not_delete: boolean;
  account_enabled: boolean;
  last_login_time?: string;
  roles: Role[];
  account_disabled_time?: string;
  creation_time: string
}

interface UserDetailsToUpdate {
  first_name?: string;
  last_name?: string;
  do_not_delete?: boolean;
}

export type {Role, User, UserDetailsToUpdate};
