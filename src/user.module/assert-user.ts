import { getManager } from 'typeorm';
import { UserModel } from './user-model';

export async function assertUser(oktaUser: any) {
  const manager = getManager();
  const oktaId = oktaUser.id;
  const existingUser = await manager.findOne(UserModel, { where: { oktaId } });
  if (existingUser) {
    return existingUser;
  }

  const user = new UserModel();
  user.oktaId = oktaId;
  user.userName = oktaUser.profile.login;
  user.firstName = oktaUser.profile.firstName;
  user.lastName = oktaUser.profile.lastName;
  user.email = oktaUser.profile.email;
  return await manager.save(user);
}
