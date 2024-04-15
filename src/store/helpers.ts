import {TUserRole} from '../models/user-management-api/common.ts';

const ORG_CODES: Record<string, string> = {
  X26: 'NHS England',
  X27: 'NHS Digital',
  RWD: 'UNITED LINCOLNSHIRE HOSPITALS NHS TRUST'
};

function getOrgName(odsCode?: string | null): string {
  if (!odsCode) {
    return '';
  }

  return ORG_CODES[odsCode];
}

function isRoleInList(roleToCheck: TUserRole, rolesList: TUserRole[]): boolean {
  for (const role of rolesList) {
    if (
      roleToCheck.role === role.role &&
      roleToCheck.organisation_code === role.organisation_code &&
      role.collection === roleToCheck.collection
    ) {
      return true;
    }
  }
  return false;
}

export {getOrgName, isRoleInList};
