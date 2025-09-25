import { plainToInstance } from 'class-transformer';

export class UserModel {
  public id: number;

  static new(data: object): UserModel {
    return plainToInstance(UserModel, data);
  }
}
