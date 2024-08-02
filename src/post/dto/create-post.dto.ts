import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { CREATE, JoiSchema, UPDATE } from "nestjs-joi";

export class CreatePostDto {
    @ApiProperty()
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string().optional())
    title: string;
  
    @ApiProperty()
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string().optional())
    description: string;
  
    @ApiProperty()
    @JoiSchema([CREATE], Joi.string().length(24).required())
    @JoiSchema([UPDATE], Joi.string().length(24).optional())
    userId: string;
}
