import bcrypt from "bcrypt";
class PasswordService {
  private password = "";
  private hashedPassword = "";

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async verifyPassword(
    password: string | undefined,
    hashedPassword: string
  ) {
    if (!password) return false;
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordService;
