import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

class PasswordGenerator {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");

    const buff = (await scryptAsync(password, salt, 16)) as Buffer;

    return `${buff}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buff = (await scryptAsync(suppliedPassword, salt, 16)) as Buffer;

    return buff.toString("hex") === hashedPassword;
  }
}
export default PasswordGenerator;
