import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/core-output.dto';

export class SignInInput extends CoreOutput {
  @ApiProperty({})
  email: string;
  @ApiProperty({})
  password: string;
}

export class SignInOutput extends CoreOutput {
  @ApiResponseProperty()
  token?: string;
}
