import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {Task} from './models/task.model'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { UsersService } from '../users/users.service';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    constructor(private readonly userService: UsersService){}
    create(dto:CreateTaskDto): Task{
        const users = this.userService.findAll();
        const userExists = users.find(u=> u.id === dto.userId);
        if(!userExists) 
            throw new NotFoundException("ID não encontrado")
        const newTask: Task = {
            id: randomUUID(),
            title: dto.title,
            description: dto.description,
            status: TaskStatus.TODO,
            userId: dto.userId
            
        }
        this.tasks.push(newTask);
        return newTask    
    }
    findAll(): Task[] {return this.tasks};
    findByUser(userId: number) {
  return this.tasks.filter(task => task.userId)
}
updateStatus(id: string, status: TaskStatus): Task {

  const task = this.tasks.find(task => task.id === id);

  if (!task) {
    throw new NotFoundException("Tarefa não encontrada");
  }

  task.status = status;

  return task;
}
}
