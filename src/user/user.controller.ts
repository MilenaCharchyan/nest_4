import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res:Response) {
    try {const data=await(this.userService.findOne(id))
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto, @Res() res:Response) {
    try {const data=await this.userService.update(id, updateUserDto)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res:Response) {
    try {const data=await this.userService.remove(id)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }  }
}
