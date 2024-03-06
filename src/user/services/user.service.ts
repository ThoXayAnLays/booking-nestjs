import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Like, Repository } from "typeorm";
import { FilterUserDto, LoginUserDto, RegisterUserDto } from "../dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}

    async create(registerUserDto: RegisterUserDto){
        registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
        const userExist = await this.userRepository.findOne({where: {email: registerUserDto.email}});
        if(userExist){
            throw new HttpException('User already exist', 400);
        }
        await this.userRepository.create(registerUserDto);
        return await this.userRepository.save(registerUserDto);
    }

    async getAllUsers(query: FilterUserDto): Promise<any>{
        const item_per_page = Number(query.item_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * item_per_page;
        const search = query.search || '';

        const [res, total] = await this.userRepository.findAndCount({
            where: [
                { username: Like('%' + search + '%') },
                { email: Like('%' + search + '%') },
                { contact: Like('%' + search + '%') },
                { type: Like('%' + search + '%') }
            ],
            take: item_per_page,
            skip: skip,
            select: ['id', 'username', 'email', 'contact', 'type']
        });
        const lastPage = Math.ceil(total / item_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return{
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async getUserById(user: any): Promise<UserEntity>{
        const result = await this.userRepository.findOne({where: {id: user.id}});
        if(!result){
            throw new HttpException('User not found', 404);
        }
        return result;
    }

    async update(filter, update) {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(
                this.reverse(update.refreshToken),
                10,
            );
        }
        return await this.userRepository.update(filter, update);
    }

    async findByLogin({ email, password }: LoginUserDto){
        const users = await this.userRepository.findBy({
            email: email,
        });
        if (!users || !users.length) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        const user = users[0];
        const is_equal = bcrypt.compareSync(password, user.password);
        if (!is_equal) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async findByEmail(email) {
        return await this.userRepository.findBy({
            email: email,
        });
    }

    async getUserByRefresh(refresh_token, email) {
        const users = await this.findByEmail(email);
        if (!users || !users.length) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const user = users[0];
        const is_equal = await bcrypt.compare(
            this.reverse(refresh_token),
            user.refreshToken,
        );
        if (!is_equal) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private reverse(s){
        return s.split('').reverse().join('');
    }
}