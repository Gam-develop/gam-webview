import { PRO_TYPE } from '../../../types/enum';

export class LoginDto {
  token: string | undefined = undefined;
  providerType: PRO_TYPE | undefined = PRO_TYPE.KA;
  deviceToken: string | undefined = undefined;
}

export class TokenDto {
  accessToken: string | null = null;
  refreshToken: string | null = null;
}
