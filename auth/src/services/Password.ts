import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const scryptAsync = promisify(scrypt);

export class Password {
  static toHash = async (password: string): Promise<string> => {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  };
  static compare = async (
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> => {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(hashedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === suppliedPassword;
  };
}
