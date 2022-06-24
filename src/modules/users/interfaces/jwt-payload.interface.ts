import { IUserIdentity } from './user-identity.interface';

export interface IJwtPayload extends IUserIdentity {
  iat: number;
  exp: number;
}
