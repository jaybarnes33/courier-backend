import UserModel from "./User.model"; // Import the Rider interface and model
import { User } from "./User.types";

class UserService {
  async createUser(data: Partial<User>): Promise<User> {
    // Create a new rider using the UserModel and save it to the database
    const user = await UserModel.create(data);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    // Find a User by ID in the database
    const user = await UserModel.findById(id);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    // Find the User by ID and update its properties in the database
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async deleteUser(id: string): Promise<User | null> {
    // Find the User by ID and remove it from the database
    const user = await UserModel.findByIdAndRemove(id);
    return user;
  }

  async getUsers(status: string): Promise<User[]> {
    // Get all Users from the database
    let users: User[];

    users = await UserModel.find({ verificationStatus: status });

    return users;
  }
}

export default new UserService();
