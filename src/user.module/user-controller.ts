import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { IsEmail, IsNotEmpty } from 'class-validator'

import { register, sessionLogin } from '../auth.module/okta-client';
import { UserModel } from './user-model';
import { assertUser } from './assert-user';
import {UserService} from "./user-service";
import {OktaService} from "./okta-client-service";

/*
 DTO is short for Data Transfer Object
 DTO is an object that carries data between processes
 In the context of web apps, it's used to document type of data to be transferred between backend and frontend
 */
export class UserRegisterDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  lastName: string;

}

@Controller('users')
export default class UserController {

  constructor(
    // private readonly userService: UserService,
    private readonly oktaUserService: OktaService
  ) {
  }

  @ApiResponse({ type: UserModel, status: 201 })
  @Post()
  async create(@Body() userData: UserRegisterDto, @Req() request: Request) {
    const { email, password, firstName, lastName } = userData;

    const succesfulOktaUser = await register({firstName, lastName, email, password});
    const user = await assertUser(succesfulOktaUser);
    const { sessionId } = await sessionLogin({ email, password });
    request.res.cookie('sessionId', sessionId);

    return { id: user.id, email, firstName, lastName };
  }

  @ApiResponse({type: UserModel, status: 200, isArray: true})
  @Get('/allokta')
   getAllUsers(): Promise<UserModel[]> {
    return this.oktaUserService.getAllUsersFromOkta();
  }

}
