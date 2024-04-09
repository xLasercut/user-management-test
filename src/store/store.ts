import {create} from 'zustand';

interface Role {
  role: string;
  collection: string;
  organisation_code: string;
}

interface State {
  currentUserDetails: {
    email: string;
    first_name: string;
    last_name: string;
    do_not_delete: boolean;
    roles: Role[];
  };
  rolesToAdd: Role[];
  rolesToDelete: Role[];
  addRolesToAdd: (role: Role) => void;
  cancelAddRoles: (role: Role) => void;
  deleteRole: (role: Role) => void;
  cancelDeleteRole: (role: Role) => void;
}

const useGlobalStore = create<State>(set => ({
  currentUserDetails: {
    email: 'john.smith@nhs.net',
    first_name: 'John',
    last_name: 'Smith',
    do_not_delete: false,
    roles: [
      {
        role: 'SUBMITTER',
        collection: 'MHSDS',
        organisation_code: 'X27',
      },
    ],
  },
  rolesToAdd: [],
  rolesToDelete: [],
  addRolesToAdd: (role: Role) => {
    return set(state => {
      return {
        rolesToAdd: [...state.rolesToAdd, role],
      };
    });
  },
  cancelAddRoles: (role: Role) => {
    return set(state => {
      return {
        rolesToAdd: state.rolesToAdd.filter(item => {
          return item !== role;
        }),
      };
    });
  },
  deleteRole: (role: Role) => {
    return set(state => {
      return {
        rolesToDelete: [...state.rolesToDelete, role],
      };
    });
  },
  cancelDeleteRole: (role: Role) => {
    return set(state => {
      return {
        rolesToDelete: state.rolesToDelete.filter(item => {
          return item !== role;
        }),
      };
    });
  },
}));

export {useGlobalStore};
