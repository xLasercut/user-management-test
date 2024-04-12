import {create} from 'zustand';
import {Role, User} from '../types.ts';
import {TCreateUserRequestBody} from '../models/user-management-api/create-user.ts';
import {TUpdateUserRequestBody} from '../models/user-management-api/update-user.ts';
import {TGetUserRequestParams} from '../models/user-management-api/get-user.ts';
import {TAddRolesRequestBody} from '../models/user-management-api/add-roles.ts';
import {TDeleteRolesRequestBody} from '../models/user-management-api/delete-roles.ts';

interface TState {
  users: User[];
  createUser: (body: TCreateUserRequestBody) => void;
  updateUser: (body: TUpdateUserRequestBody) => void;
  getUser: (params: TGetUserRequestParams) => User[];
  addRoles: (body: TAddRolesRequestBody) => void;
  deleteRoles: (body: TDeleteRolesRequestBody) => void;
}

function isUserInOrg(user: User, organisation_code: string | null | undefined): boolean {
  for (const role of user.roles) {
    if (role.organisation_code === organisation_code) {
      return true;
    }
  }
  return false;
}

function shouldIncludeUser(params: TGetUserRequestParams, user: User): boolean {
  const email = params.email;
  const organisation_code = params.organisation_code;
  const account_enabled = params.account_enabled;

  const emailEqual = user.email === email;
  const accountEnabledEqual = `${user.account_enabled}` === account_enabled;
  const userInOrg = isUserInOrg(user, organisation_code);

  console.log(params);

  if (email && organisation_code && account_enabled) {
    return emailEqual && accountEnabledEqual && userInOrg;
  }

  if (email && account_enabled) {
    return emailEqual && accountEnabledEqual;
  }

  if (email && organisation_code) {
    return emailEqual && userInOrg;
  }

  if (email) {
    return emailEqual;
  }

  if (organisation_code && account_enabled) {
    return accountEnabledEqual && userInOrg;
  }

  if (organisation_code) {
    return userInOrg;
  }

  if (account_enabled) {
    return accountEnabledEqual;
  }

  return false;
}

function filterRoles(params: TGetUserRequestParams, role: Role): boolean {
  const organisation_code = params.organisation_code;

  if (organisation_code) {
    return role.organisation_code === organisation_code;
  }
  return true;
}

const USERS: User[] = [
  {
    email: 'john.smith@nhs.net',
    first_name: 'John',
    last_name: 'Smith',
    do_not_delete: false,
    account_enabled: true,
    roles: [
      {
        role: 'SUBMITTER',
        collection: 'MHSDS',
        organisation_code: 'X27',
      },
    ],
    creation_time: '2001-01-01T00:00:00',
  },
  {
    email: 'test.user@nhs.net',
    first_name: 'Test',
    last_name: 'User',
    do_not_delete: false,
    account_enabled: true,
    roles: [
      {
        role: 'SUBMITTER',
        collection: 'CSDS',
        organisation_code: 'X26',
      },
      {
        role: 'ANALYST',
        collection: 'MSDS',
        organisation_code: 'X26',
      },
    ],
    creation_time: '2001-01-01T00:00:00',
  },
  {
    email: 'deleted.user@nhs.net',
    first_name: 'Deleted',
    last_name: 'User',
    do_not_delete: false,
    account_enabled: false,
    roles: [
      {
        role: 'SUBMITTER',
        collection: 'CSDS',
        organisation_code: 'X26',
      },
      {
        role: 'ANALYST',
        collection: 'MSDS',
        organisation_code: 'X26',
      },
    ],
    creation_time: '2001-01-01T00:00:00',
    account_disabled_time: '2001-01-01T00:00:00',
  },
];

const userManagementApi = create<TState>((set, get) => {
  return {
    users: USERS,
    createUser: (body: TCreateUserRequestBody) => {
      const userToAdd: User = {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        do_not_delete: false,
        account_enabled: body.account_enabled === 'true',
        roles: [],
        creation_time: new Date().toISOString(),
      };
      return set(state => {
        return {
          users: [...state.users, userToAdd],
        };
      });
    },
    updateUser: (body: TUpdateUserRequestBody) => {
      return set(state => {
        return {
          users: state.users.map(user => {
            if (user.email === body.email) {
              const {account_enabled, do_not_delete, email, ...rest} = body;

              return {
                ...user,
                ...rest,
                account_enabled: account_enabled
                  ? account_enabled === 'true'
                  : user.account_enabled,
                do_not_delete: do_not_delete ? do_not_delete === 'true' : user.do_not_delete,
              };
            }
            return user;
          }),
        };
      });
    },
    getUser: (params: TGetUserRequestParams) => {
      return get()
        .users.filter(user => {
          return shouldIncludeUser(params, user);
        })
        .map(user => {
          return {
            ...user,
            roles: user.roles.filter(role => {
              return filterRoles(params, role);
            }),
          };
        });
    },
    addRoles: (body: TAddRolesRequestBody) => {
      return set(state => {
        return {
          users: state.users.map(user => {
            if (user.email === body.email) {
              return {
                ...user,
                roles: [...user.roles, ...body.roles],
              };
            }
            return user;
          }),
        };
      });
    },
    deleteRoles: (body: TDeleteRolesRequestBody) => {
      return set(state => {
        return {
          users: state.users.map(user => {
            if (user.email === body.email) {
              return {
                ...user,
                roles: user.roles.filter(role => {
                  for (const roleToRemove of body.roles) {
                    if (
                      role.role === roleToRemove.role &&
                      role.organisation_code === roleToRemove.organisation_code &&
                      role.collection === roleToRemove.collection
                    ) {
                      return false;
                    }
                  }
                  return true;
                }),
              };
            }
            return user;
          }),
        };
      });
    },
  };
});

export {userManagementApi};
