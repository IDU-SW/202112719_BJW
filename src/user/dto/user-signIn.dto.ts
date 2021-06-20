import { CoreOutput } from 'src/common/core-output.dto';

export class SignInInput extends CoreOutput {
  email: string;
  password: string;
}

export class SignInOutput extends CoreOutput {
  token?: string;
}
