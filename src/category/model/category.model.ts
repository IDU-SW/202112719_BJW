import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Product } from 'src/product/model/product.model';

@Table({
  timestamps: false,
})
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(200),
  })
  category_name: string;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
