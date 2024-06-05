import { ClientError, InternalServerError } from "../../entities/ApiError";
import { IUserRepository } from "../../repository/user.repository";
import { bcryptHashUtils } from "../../utils/hash.utils";
import { jwtUtils } from "../../utils/jwt.utils";
import { IUserService } from "./user.interface";

class UserService implements IUserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }
  async login(data: any): Promise<any> {
    try {
      const user = await this.userRepo.getUserByEmail(data.email);

      const userData = user.data();

      if (!user) {
        throw new ClientError({
          message: "User not found",
          code: 404,
        });
      }

      // check if password is correct
      const isValidPassword = await bcryptHashUtils.compare(
        data.password,
        userData.password
      );

      if (!isValidPassword) {
        throw new ClientError({
          message: "Invalid password",
          code: 400,
        });
      }

      const token = jwtUtils.sign(
        { id: userData.id },
        process.env.JWT_SECRET ?? ""
      );

      return {
        token,
      };
    } catch (error) {
      if (
        !(error instanceof InternalServerError) &&
        !(error instanceof ClientError)
      ) {
        console.error(error);
        throw new InternalServerError({
          message: (error as Error).message,
          errors: (error as Error).stack,
        });
      }

      throw error;
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.userRepo.getUserById(id);

      return user;
    } catch (error) {
      console.error(error);
    }
  }
  async createUser(user: any): Promise<any> {
    try {
      // check if user already exists
      const existingUser = await this.userRepo.getUserByEmail(user.email);

      if (existingUser) {
        throw new ClientError({
          message: "User already exists",
          code: 400,
        });
      }

      const newUser = await this.userRepo.createUser(user);

      let token;

      if (newUser) {
        token = jwtUtils.sign({ id: newUser.id }, process.env.JWT_SECRET ?? "");
      }

      console.log(token, "token");

      return {
        token,
      };
    } catch (error) {
      if (
        !(error instanceof InternalServerError) &&
        !(error instanceof ClientError)
      ) {
        console.error(error);
        throw new InternalServerError({
          message: (error as Error).message,
          errors: (error as Error).stack,
        });
      }

      throw error;
    }
  }
  async updateUser(user: any): Promise<any> {
    try {
      // check if user exists
      const existingUser = await this.userRepo.getUserById(user.id);

      if (!existingUser) {
        throw new ClientError({
          message: "User not found",
          code: 400,
        });
      }

      const updatedUser = await this.userRepo.updateUser(user);

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }
  deleteUser(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getUsers(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export { UserService };
