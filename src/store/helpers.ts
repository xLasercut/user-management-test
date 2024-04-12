import {Role} from '../types.ts';

const ORG_CODES: Record<string, string> = {
  X26: 'NHS England',
  X27: 'NHS Digital',
};

function getOrgName(odsCode?: string | null): string {
  if (!odsCode) {
    return ''
  }


  return ORG_CODES[odsCode];
}

function isRoleInList(roleToCheck: Role, rolesList: Role[]): boolean {
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
