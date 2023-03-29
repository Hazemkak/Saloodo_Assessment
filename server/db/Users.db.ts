import { v4 as uuidv4 } from "uuid";

export interface Users {
  id: string;
  username: string;
  password: string;
  userType: "biker" | "sender";
}

class UsersDatabase {
  private users: Map<string, Users> = new Map();

  public addUser(
    username: string,
    password: string,
    userType: "biker" | "sender"
  ) {
    const user: Users = {
      id: uuidv4(),
      username,
      password,
      userType,
    };
    this.users.set(user.id, user);
    return user;
  }

  public findUserById(id: string) {
    return this.users.get(id);
  }

  public findUserByUsername(username: string) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
}

const usersDatabase = new UsersDatabase();

export default usersDatabase;
