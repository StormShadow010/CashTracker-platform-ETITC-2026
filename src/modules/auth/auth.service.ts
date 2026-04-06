import AuthRepository from "./auth.repository";
import {
  registerSchema,
  loginSchema,
  RegisterBody,
  LoginBody,
} from "./auth.schema";
import { comparePassword, hashPassword } from "../../utils/bcryp";
import { generateToken } from "../../utils/jwt";

class AuthService {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async register(body: RegisterBody) {
    const { name, email, password } = registerSchema.parse(body);

    const existing = await this.repository.findByEmail(email);
    if (existing) throw new Error("El email ya está registrado");

    const hashedPassword = await hashPassword(password);
    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    // const token = this.generateToken(String(user._id), user.role);
    const token = generateToken(String(user._id), user.role);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(body: LoginBody) {
    const { email, password } = loginSchema.parse(body);

    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Credenciales inválidas");

    const token = generateToken(String(user._id), user.role);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getAllUsers() {
    return this.repository.findAll();
  }

  async deleteUser(id: string) {
    const user = await this.repository.deleteById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}

export default AuthService;
