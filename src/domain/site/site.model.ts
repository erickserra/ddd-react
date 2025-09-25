import { plainToInstance } from 'class-transformer';

export class SiteModel {
  public id: number;

  static new(data: object): SiteModel {
    return plainToInstance(SiteModel, data);
  }
}
