interface IUserRepository {
  getUserById(id: number): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  createUser(user: any): Promise<any>;
  updateUser(user: any): Promise<any>;
  deleteUser(id: number): Promise<any>;
  getUsers(): Promise<any>;
}

export type { IUserRepository };
