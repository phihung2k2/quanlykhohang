import * as bcrypt from 'bcryptjs';

export function hashCode() {
  function hash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  function verifyCode(hashedPassword: string, password: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  return { hash, verifyCode };
}
