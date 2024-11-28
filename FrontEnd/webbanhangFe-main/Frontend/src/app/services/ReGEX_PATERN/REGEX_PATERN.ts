export const REGEX_PATERN = {
  EMAIL: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
  EMAIL_LIST: /^([a-zA-Z0-9][a-zA-Z0-9_*$&+,:;=?#|'<>.^*()%!-]{0}@[a-zA-Z0-9-]{2,}(.[a-zA-Z0-9-]{2,}){1}\s*?;?\s*?)+$/,
  USERNAME: /^[a-zA-Z0-9-._]*$/,
  CODE: /^[a-zA-Z0-9-._]*$/,
  ARTICLE_CODE: /^[a-zA-Z0-9-._]*$/,
  PORTAL_CODE: /^[a-zA-Z0-9-._]*$/,
  ROLES: /^[a-zA-Z0-9-._]*$/,
  LANGUAGES: /^[a-zA-Z0-9-._]*$/,
  MENU_CODE: /^[a-zA-Z0-9-._]*$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  PHONE:/"^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"/,
  TAX_CODE:/^[-+/()0-9]*$/
};
