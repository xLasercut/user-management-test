const ROOT_ROUTE = '/user-management-test';
const USER_MANAGEMENT_PORTAL_ROUTE = `${ROOT_ROUTE}/user-management`;

const ROUTES = {
  HOME: `${ROOT_ROUTE}/`,
  ERROR: `${ROOT_ROUTE}/error`,
  USER_MANAGEMENT_HOME: `${USER_MANAGEMENT_PORTAL_ROUTE}/`,
  USER_PERMISSIONS: `${USER_MANAGEMENT_PORTAL_ROUTE}/user-permissions`,
  EDIT_USER: (email: string) => `${USER_MANAGEMENT_PORTAL_ROUTE}/edit-user/${email}`,
  DELETE_USER_CONFIRM: (email: string) =>
    `${USER_MANAGEMENT_PORTAL_ROUTE}/delete-user-confirm/${email}`,
  EDIT_USER_DETAILS: (email: string) =>
    `${USER_MANAGEMENT_PORTAL_ROUTE}/edit-user-details/${email}`,
  ADD_ROLE: `${USER_MANAGEMENT_PORTAL_ROUTE}/add-role`,
  DELETE_ROLE_CONFIRM: `${USER_MANAGEMENT_PORTAL_ROUTE}/delete-role-confirm`,
  EMAIL_CHECK: `${USER_MANAGEMENT_PORTAL_ROUTE}/email-check`,
  DELETED_USERS: `${USER_MANAGEMENT_PORTAL_ROUTE}/deleted-users`,
  RESTORE_USER_CONFIRM: (email: string) =>
    `${USER_MANAGEMENT_PORTAL_ROUTE}/restore-user-confirm/${email}`,
  ADD_USER: (email: string) => `${USER_MANAGEMENT_PORTAL_ROUTE}/add-user/${email}`,
  EMAIL_STATUS: `${USER_MANAGEMENT_PORTAL_ROUTE}/email-status`
} as const;

export {ROUTES};
