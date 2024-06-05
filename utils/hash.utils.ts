import { hash as bhash, compare as bcompare } from "bcrypt";
import { InternalServerError } from "../entities/ApiError";

interface IHashUtils {
  hash(rawString: string, secret?: string): Promise<string>;
  compare(rawString: string, hashedString: string): Promise<boolean>;
}

class BcryptHashUtils implements IHashUtils {
  private salt: number;

  constructor(salt = 8) {
    this.salt = salt;
  }

  hash(rawString: string): Promise<string> {
    try {
      return bhash(rawString, this.salt);
    } catch (error) {
      console.error(error);

      throw new InternalServerError({
        message: (error as Error).message,
        errors: (error as Error).stack,
      });
    }
  }

  compare(rawString: string, hashedString: string): Promise<boolean> {
    try {
      console.log(rawString, "separator", hashedString);

      return bcompare(rawString, hashedString);
    } catch (error) {
      console.error(error);

      throw new InternalServerError({
        message: (error as Error).message,
        errors: (error as Error).stack,
      });
    }
  }
}

const bcryptHashUtils = new BcryptHashUtils();

export { bcryptHashUtils };
