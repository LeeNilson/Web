import { Controller, Post, Param, Patch, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);     }
  @Get()
  findAll() {  return this.usersService.findAll(); }
  @Patch (':id/status')
  updateStatus(
    @Param('id') id: Number,
    @Body('status') status:string,
  ){
    return this.updateStatus(+id,status);
  }
  
    
}
