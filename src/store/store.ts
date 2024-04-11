import {create} from 'zustand';
import {Role, User, UserDetailsToUpdate, UserToAdd} from '../types.ts';
import {isRoleInList} from './helpers.ts';

interface State {
  users: User[];
  userDetailsToUpdate: UserDetailsToUpdate;
  userToAdd: UserToAdd;
  rolesToAdd: Role[];
  rolesToDelete: Role[];
  addRoleToAdd: (role: Role) => void;
  removeRoleToAdd: (role: Role) => void;
  addRoleToDelete: (role: Role) => void;
  removeRoleToDelete: (role: Role) => void;
  addUserDetailsToUpdate: (details: UserDetailsToUpdate) => void;
  getUser: (email: string) => User;
  isUserExist: (email: string) => boolean;
  applyChanges: (
    email: string,
    userDetails: UserDetailsToUpdate,
    rolesToAdd: Role[],
    rolesToDelete: Role[]
  ) => void;
  clear: () => void;
  deleteUser: (email: string) => void;
  restoreUser: (email: string) => void;
  updateUserToAdd: (field: string, value: any) => void;
  addUser: (user: User) => void
}

const allUsers: User[] = [
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

const useGlobalStore = create<State>((set, get) => ({
  users: allUsers,
  userDetailsToUpdate: {},
  userToAdd: {
    email: '',
    first_name: '',
    last_name: '',
    do_not_delete: false,
    account_enabled: true,
    creation_time: '',
  },
  rolesToAdd: [],
  rolesToDelete: [],
  addRoleToAdd: (role: Role) => {
    return set(state => {
      return {
        rolesToAdd: [...state.rolesToAdd, role],
      };
    });
  },
  removeRoleToAdd: (role: Role) => {
    return set(state => {
      return {
        rolesToAdd: state.rolesToAdd.filter(item => {
          return item !== role;
        }),
      };
    });
  },
  addRoleToDelete: (role: Role) => {
    return set(state => {
      return {
        rolesToDelete: [...state.rolesToDelete, role],
      };
    });
  },
  removeRoleToDelete: (role: Role) => {
    return set(state => {
      return {
        rolesToDelete: state.rolesToDelete.filter(item => {
          return item !== role;
        }),
      };
    });
  },
  addUserDetailsToUpdate: (details: UserDetailsToUpdate) => {
    return set(() => {
      return {
        userDetailsToUpdate: details,
      };
    });
  },
  getUser: (email: string): User => {
    return get().users.filter(user => user.email === email)[0];
  },
  isUserExist: (email: string): boolean => {
    return get().users.filter(user => user.email === email).length === 1;
  },
  updateUserToAdd: (field: string, value: any) => {
    return set(state => {
      return {
        userToAdd: {
          ...state.userToAdd,
          [field]: value,
        },
      };
    });
  },
  applyChanges: (
    email: string,
    userDetails: UserDetailsToUpdate,
    rolesToAdd: Role[],
    rolesToDelete: Role[]
  ) => {
    return set(state => {
      return {
        users: state.users.map(user => {
          if (user.email === email) {
            return {
              ...user,
              roles: [
                ...user.roles.filter(role => {
                  return !isRoleInList(role, rolesToDelete);
                }),
                ...rolesToAdd,
              ],
              ...userDetails,
            };
          }

          return user;
        }),
      };
    });
  },
  clear: () => {
    return set(() => {
      return {
        rolesToDelete: [],
        rolesToAdd: [],
        userDetailsToUpdate: {},
        userToAdd: {
          email: '',
          first_name: '',
          last_name: '',
          do_not_delete: false,
          account_enabled: true,
          creation_time: '',
        },
      };
    });
  },
  deleteUser: (email: string) => {
    return set(state => {
      return {
        users: state.users.map(user => {
          if (user.email === email) {
            return {
              ...user,
              account_enabled: false,
              account_disabled_time: new Date().toISOString(),
            };
          }
          return user;
        }),
      };
    });
  },
  restoreUser: (email: string) => {
    return set(state => {
      return {
        users: state.users.map(user => {
          if (user.email === email) {
            return {
              ...user,
              account_enabled: true,
              account_disabled_time: undefined,
            };
          }
          return user;
        }),
      };
    });
  },
  addUser: (user: User) => {
    return set(state => {
      return {
        users: [...state.users, user]
      }
    })
  }
}));

export {useGlobalStore};
