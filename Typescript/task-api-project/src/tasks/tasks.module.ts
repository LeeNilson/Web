import { Module } from '@nestjs/common';
import {TasksController} from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';

@Module({
imports:[UsersModule] ,
controllers: [TasksService],
providers:[TasksService],
})
export class TasksModule {}
