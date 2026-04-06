import User, { IUser } from "./auth.model";

class AuthRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findById(id: string) {
    return User.findById(id).select("-password");
  }

  async findAll() {
    return User.find().select("-password");
  }

  async create(data: Pick<IUser, "name" | "email" | "password">) {
    return User.create(data);
  }

  async deleteById(id: string) {
    return User.findByIdAndDelete(id);
  }
}

export default AuthRepository;
