import bcrypt from "bcryptjs";
export class Password {
  static toHash = async (password: string): Promise<string> => {
    const hashedPass = await bcrypt.hash(password, 12);
    return hashedPass;
  };
  static compare = async (
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> => {
    const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
    return isMatch;
  };
}
