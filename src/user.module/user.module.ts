import {Module} from '@nestjs/common';
import {UserService} from "./user-service";
import {OktaService} from "./okta-client-service";
import UserController from "./user-controller";

@Module({
  providers: [OktaService],
  controllers: [UserController]
})
export class UserModule {
}
