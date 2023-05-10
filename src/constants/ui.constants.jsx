// Optional question max length
export const CHARACTER_LIMIT = "255";

//Password max and min length
export const PASS_LENGTH_MAX = "24";
export const PASS_LENGTH_MIN = "8";

//Regex for email with min 1 upper case, 1 number and lenght between 8 and 24 chars
export const PASSWORD_REGEX =
  "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,24}";
