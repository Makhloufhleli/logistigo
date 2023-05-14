import { User } from '@app/entities/User';

export class TokensDataResponse {
  user?: User;
  accessToken: string;
  refreshToken: string;
}
