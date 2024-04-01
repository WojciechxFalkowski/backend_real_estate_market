import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SafeUser, User } from './user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './user.contracts';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDataDto } from './dto/create-user.dto';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) { }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.user.find(user => user.username === username);
  // }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findUserWithPasswordByEmail(
    email: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  public async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async checkIfUserExists(email: string): Promise<User | null> {
    const existingUser = await this.userRepository.findOneBy({ email });
    return existingUser;
  }

  public async getSafeData(email: string): Promise<SafeUser | null> {
    const { password, ...payload } = await this.userRepository.findOneBy({
      email,
    });
    return payload;
  }

  public async register(
    userDetails: UserRegistrationDataDto,
  ): Promise<SafeUser | null> {
    // Check if a user with the same email already exists
    const existingUser = await this.checkIfUserExists(userDetails.email);
    if (existingUser) {
      // throw new Error('A user with this email already exists.');
      throw new HttpException('A user with this email already exists.', HttpStatus.CONFLICT);
      // message: 'A user with this email already exists.'
    }

    // Create a new user instance
    const newUser = new User();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    bcrypt.compare;
    // Set the user properties
    newUser.email = userDetails.email;
    newUser.password = hashedPassword;

    // Save the user in the database
    const user = await this.userRepository.save(newUser);

    return await this.getSafeData(user.email);
  }

  public async validateUserPassword(
    inputPassword: string,
    password: string,
  ): Promise<boolean> {
    // Compare the entered password with the stored hashed password
    const isPasswordMatching = await bcrypt.compare(inputPassword, password);
    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }

    return isPasswordMatching;
  }
}
