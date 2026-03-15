import { Injectable } from '@nestjs/common';
import { randomUUID, createHash } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
@Injectable()
export class UsersService {
    private users: User[] = [];
    create(dto: CreateUserDto){
        const newUser: User ={
            id: randomUUID(),
            name: dto.name,
            email: dto.email.toLocaleLowerCase(),
            passwordHash: createHash('sha256')
            .update(dto.password).digest('hex')
        };
        this.users.push(newUser);
        const{passwordHash, ...userSemPassword} = newUser;
        return userSemPassword
    }
    findAll(){
        return this.users
        .map(({passwordHash, ...safeUser})=> safeUser);
    }
}
