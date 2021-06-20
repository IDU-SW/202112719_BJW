import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { User } from 'src/user/model/user.model';

@Table({
  timestamps: false,
})
export class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(200),
  })
  product_name: string;

  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @Column({})
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  price: string;

  @Column
  is_bargain: string;

  @Column
  harvest_day: string;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
