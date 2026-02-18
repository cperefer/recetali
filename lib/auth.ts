import { compare } from "bcrypt";

export const validatePassword = (
  inputPassword: string,
  validaPassword: string,
): Promise<boolean> => {
  return compare(inputPassword, validaPassword);
};
