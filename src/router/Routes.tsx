const ROOT_ROUTE = '/user-management-test';
const USER_MANAGEMENT_PORTAL_ROUTE = `${ROOT_ROUTE}/user-management`;
const SUBMISSIONS_PORTAL_ROUTE = `${ROOT_ROUTE}/submissions-portal`;
const SUBMISSIONS_ROUTE = `${SUBMISSIONS_PORTAL_ROUTE}/submission`;

const ROUTES = {
  HOME: `${ROOT_ROUTE}/`,
  ERROR: `${ROOT_ROUTE}/error`,
  // user management
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
  EMAIL_STATUS: `${USER_MANAGEMENT_PORTAL_ROUTE}/email-status`,
  // submissions
  SUBMISSIONS_PORTAL_HOME: `${SUBMISSIONS_PORTAL_ROUTE}/`,
  SET_SUBMISSION_CONFIG: `${SUBMISSIONS_PORTAL_ROUTE}/submission-config`,
  SUBMISSIONS_HOME: `${SUBMISSIONS_ROUTE}/collection`,
  SUBMISSION_TYPE: `${SUBMISSIONS_ROUTE}/type`,
  SUBMISSION_WINDOW: `${SUBMISSIONS_ROUTE}/window`,
  SUBMIT_DATA_ROUTE: (type: string) => `${SUBMISSIONS_ROUTE}/submit-data/${type}`,
} as const;

export {ROUTES};
