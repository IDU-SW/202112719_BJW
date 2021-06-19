import { Column, DataType, Model, Table } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Enum_User_Role } from '../interface/user-role.interface';

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  role: Enum_User_Role;

  @Column
  email: string;

  @Column
  user_name: string;

  @Column
  password: string;

  @Column
  address: string;

  @Column
  phone: string;

  @Column
  is_deleted: boolean;

  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
