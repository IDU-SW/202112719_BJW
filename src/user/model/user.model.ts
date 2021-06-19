import { Column, DataType, Model, Table } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Enum_User_Role } from '../dto/user-role.enum';

@Table({
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ defaultValue: Enum_User_Role.CLIENT })
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

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
