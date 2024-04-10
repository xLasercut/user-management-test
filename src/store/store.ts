import {create} from 'zustand';
import {Role, User} from '../types.ts';
import {isRoleInList} from './helpers.ts';

interface State {
  users: User[];
  rolesToAdd: Role[];
  rolesToDelete: Role[];
  addRoleToAdd: (role: Role) => void;
  removeRoleToAdd: (role: Role) => void;
  addRoleToDelete: (role: Role) => void;
  removeRoleToDelete: (role: Role) => void;
  getUser: (email: string) => User;
  applyChanges: (email: string, rolesToAdd: Role[], rolesToDelete: Role[]) => void;
  clear: () => void;
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
  },
];

const useGlobalStore = create<State>((set, get) => ({
  users: allUsers,
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
  getUser: (email: string): User => {
    return get().users.filter(user => user.email === email)[0];
  },
  applyChanges: (email: string, rolesToAdd: Role[], rolesToDelete: Role[]) => {
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
      };
    });
  },
}));

export {useGlobalStore};
