import { Firestore } from "firebase-admin/firestore";
import { IUserRepository } from "../../user.repository";
import { User } from "../../../entities/user.entity";
import { bcryptHashUtils } from "../../../utils/hash.utils";

class FirebaseUserRespository implements IUserRepository {
  private fireStoreClient: Firestore;

  constructor(fireStoreClient: Firestore) {
    this.fireStoreClient = fireStoreClient;
  }
  async getUserByEmail(email: string): Promise<any> {
    try {
      const snapshot = await this.fireStoreClient
        .collection("users")
        .where("email", "==", email)
        .get();

      if (snapshot.empty) return null;

      return snapshot.docs[0];
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.fireStoreClient.doc(`users/${id}`).get();

      return user;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve(undefined); // Add this line
  }

  async createUser(user: User): Promise<any> {
    try {
      user.password = await bcryptHashUtils.hash(user.password);

      const newUser = await this.fireStoreClient.collection("users").add(user);

      return newUser;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
  async updateUser(user: any): Promise<any> {
    try {
      console.log(user, "user");

      const updatedUser = await this.fireStoreClient
        .doc(`users/${user.id}`)
        .update(user);

      return updatedUser;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
  deleteUser(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getUsers(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export { FirebaseUserRespository };
