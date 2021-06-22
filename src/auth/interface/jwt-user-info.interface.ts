import { Enum_User_Role } from 'src/user/dto/user-role.enum';

export class JwtUserInfo {
  id: string;
  username: string;
  role: Enum_User_Role;
}
