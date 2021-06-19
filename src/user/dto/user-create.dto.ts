import { CoreOutput } from 'src/common/core-output.dto';
import { Enum_User_Role } from './user-role.enum';

export interface CreateUserInput {
  email: string;
  password: string;
  address: string;
  role: Enum_User_Role;
  phone: string;
}

export interface CreateUserOutput extends CoreOutput {
  data?: any;
}
