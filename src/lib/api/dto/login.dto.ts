import { PRO_TYPE } from '../../../types/enum';

export class LoginDto {
  token: string | undefined = undefined;
  providerType: PRO_TYPE | undefined = PRO_TYPE.KA;
  deviceToken: string | undefined = undefined;
}
