import {create} from 'zustand';
import {TUserRole} from '../models/user-management-api/common.ts';
import {TUpdateUserRequestBody} from '../models/user-management-api/update-user.ts';
import {TCreateUserRequestBody} from '../models/user-management-api/create-user.ts';

interface TState {
  rolesToAdd: TUserRole[];
  rolesToDelete: TUserRole[];
  detailsToUpdate: TUpdateUserRequestBody;
  userToCreate: TCreateUserRequestBody;
  clear: () => void;
  setDetailsToUpdate: (field: string, value: any) => void;
  addRoleToAdd: (role: TUserRole) => void;
  removeRoleToAdd: (role: TUserRole) => void;
  addRoleToDelete: (role: TUserRole) => void;
  removeRoleToDelete: (role: TUserRole) => void;
  setUserToCreate: (field: string, value: any) => void;
}

const editUserStore = create<TState>(set => ({
  rolesToAdd: [],
  rolesToDelete: [],
  detailsToUpdate: {email: ''},
  userToCreate: {email: ''},
  clear: () => {
    return set(() => {
      return {
        rolesToAdd: [],
        rolesToDelete: [],
        detailsToUpdate: {email: ''},
        userToCreate: {email: ''},
      };
    });
  },
  setDetailsToUpdate: (field: string, value: any) => {
    return set(state => {
      return {
        detailsToUpdate: {
          ...state.detailsToUpdate,
          [field]: value,
        },
      };
    });
  },
  addRoleToAdd: (role: TUserRole) => {
    return set(state => {
      return {
        rolesToAdd: [...state.rolesToAdd, role],
      };
    });
  },
  removeRoleToAdd: (role: TUserRole) => {
    return set(state => {
      return {
        rolesToAdd: state.rolesToAdd.filter(currentRole => role !== currentRole),
      };
    });
  },
  addRoleToDelete: (role: TUserRole) => {
    return set(state => {
      return {
        rolesToDelete: [...state.rolesToDelete, role],
      };
    });
  },
  removeRoleToDelete: (role: TUserRole) => {
    return set(state => {
      return {
        rolesToDelete: state.rolesToDelete.filter(currentRole => role !== currentRole),
      };
    });
  },
  setUserToCreate: (field: string, value: any) => {
    return set(state => {
      return {
        userToCreate: {
          ...state.userToCreate,
          [field]: value,
        },
      };
    });
  },
}));

export {editUserStore};
