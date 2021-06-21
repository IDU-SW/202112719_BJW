import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/core-output.dto';
import { Enum_User_Role } from './user-role.enum';

export class CreateUserInput {
  @ApiProperty({})
  email: string;
  @ApiProperty({})
  password: string;
  @ApiProperty({})
  address: string;
  @ApiProperty({
    default: Enum_User_Role.CLIENT,
  })
  role: Enum_User_Role;
  @ApiProperty({})
  phone: string;
}

export class CreateUserOutput extends CoreOutput {
  data?: any;
}
