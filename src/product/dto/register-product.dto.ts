import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/core-output.dto';

export class RegisterProductInput extends CoreOutput {
  @ApiProperty()
  product_name: string;
  @ApiProperty()
  price: string;
  @ApiProperty()
  is_bargain: boolean;
  @ApiProperty()
  harvest_day: string;
  @ApiProperty()
  category_id: string;
  user_id: string;
}

export class RegisterProductOutput extends CoreOutput {
  @ApiResponseProperty()
  result?: any;
}
