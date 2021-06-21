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
import { Category } from 'src/category/model/category.model';

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
    defaultValue: 0,
  })
  @ForeignKey(() => Category)
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING(200),
    defaultValue: '0',
  })
  price: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_bargain: boolean;

  @Column
  harvest_day: string;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
