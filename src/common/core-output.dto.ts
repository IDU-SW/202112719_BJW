import { ApiResponseProperty } from '@nestjs/swagger';

export class CoreOutput {
  @ApiResponseProperty()
  ok: boolean;
  @ApiResponseProperty()
  message?: string;
}
