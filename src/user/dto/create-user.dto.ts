import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { CREATE, JoiSchema, UPDATE } from "nestjs-joi";

export class CreateUserDto {
    @ApiProperty({
        default:"Anna"
    })
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string().optional())
    name: string;
  
    @ApiProperty({
        default:"Anyan"
    })
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string().optional())
    surname: string;
  
    @ApiProperty({
        default:19
    })
    @JoiSchema([CREATE], Joi.number().integer().min(0).required())
    @JoiSchema([UPDATE], Joi.number().integer().min(0).optional())
    age: number;
  
    @ApiProperty({type:[Number]})
    @JoiSchema([CREATE], Joi.array().required())
    @JoiSchema([UPDATE], Joi.array().optional())
    rating: number[];
}
