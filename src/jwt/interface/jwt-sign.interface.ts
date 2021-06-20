import { Enum_User_Role } from 'src/user/dto/user-role.enum';

export interface JwtSign {
  id: number;
  email: string;
  address: string;
  role: Enum_User_Role;
  phone: string;
}
