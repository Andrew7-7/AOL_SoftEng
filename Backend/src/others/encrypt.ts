const bcrypt = require("bcrypt");

const salt = 10;

export class encrypt {
  static async hashPass(password: string) {
    return bcrypt.hashSync(password, salt);
  }

  static async comparePass(userInputPass: string, hashPass: string) {
    return bcrypt.compareSync(userInputPass, hashPass);
  }
}
