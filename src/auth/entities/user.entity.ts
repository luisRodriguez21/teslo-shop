import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Product } from "../../products/entities";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('text', {
    unique: true,
    select: false,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: []
  })
  roles: string[];

  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product;


  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }

}
