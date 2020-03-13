import {Client as OktaClient} from '@okta/okta-sdk-nodejs';
import {UserModel} from "./user-model";
import {Injectable} from "@nestjs/common";
import {finalize} from "rxjs/operators";

const {OKTA_DOMAIN, OKTA_APP_TOKEN} = process.env;

const oktaClient = new OktaClient({
  orgUrl: OKTA_DOMAIN || 'https://dev-638025.okta.com',
  token: OKTA_APP_TOKEN || '00zzWhUOtcBSbxAFH1q2Rn3JzUr_Q0oCAJSZgSFyus',
});

@Injectable()
export class OktaService {
  constructor() {
  }

  async getAllUsersFromOkta(): Promise<UserModel[]> {
    const users = oktaClient.listUsers();
    let internalUsers: UserModel[] = new Array<UserModel>();


    await users.each(user => {

      const u = new UserModel();
      u.oktaId = user.id;
      u.userName = user.profile.login;
      u.firstName = user.profile.firstName;
      u.lastName = user.profile.lastName;
      u.email = user.profile.email;
      u.status = user.status;
      u.mobilePhone = user.profile.mobilePhone;
      internalUsers.push(u);
    });
    return internalUsers;
  }
}
