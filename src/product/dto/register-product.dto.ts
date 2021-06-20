import { CoreOutput } from 'src/common/core-output.dto';

export class RegisterProductInput extends CoreOutput {
  product_name: string;
  price: string;
  is_bargain: boolean;
  harvest_day: string;
  category_id: string;
  user_id: string;
}

export class RegisterProductOutput extends CoreOutput {
  result?: any;
}
