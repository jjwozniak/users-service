import { Module } from '@nestjs/common';
import {UserService} from "../user.module/user-service";
import {OktaService} from "../user.module/okta-client-service";
import AuthController from "./auth-controller";

@Module({
  providers: [OktaService],
  controllers: [AuthController]
})
export class AuthModule {}
