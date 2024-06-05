interface IUserService {
  getUserById(id: number): Promise<any>;
  createUser(user: any): Promise<any>;
  updateUser(user: any): Promise<any>;
  deleteUser(id: number): Promise<any>;
  getUsers(): Promise<any>;
  login(data: any): Promise<any>;
}

export type { IUserService };
