import { firebaseUserRepository } from "../../repository/dataSource/firebase";
import { IUserService } from "./user.interface";
import { UserService } from "./user.service";

const userService = new UserService(firebaseUserRepository);

export { userService };
export type { IUserService };
