import User from '../models/User';
import { getRepository } from 'typeorm';
interface Request {
    name: string;
    email: string;
    password: string;
}
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('User already exists!');
        }

        const hashedPassword = await hash(password, 8);
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
