import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res:Response) {
    try {const data=await this.postService.create(createPostDto)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }    
  }

  @Get()
  async findAll( @Res() res:Response) {
    try {const data=await this.postService.findAll()
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res:Response) {
    try {const data=await this.postService.findOne(id)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto, @Res() res:Response) {
    try {const data=await this.postService.update(id, updatePostDto)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res:Response) {
    try {const data=await this.postService.remove(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({message:e.message})
    }
  }
}
