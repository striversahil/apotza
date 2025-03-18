class PasswordService {
  #class = "PasswordService";
  #password = "";

  static async hashPassword(password: string) {
    return password;
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return password === hashedPassword;
  }
}
