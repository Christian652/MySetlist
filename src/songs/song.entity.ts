import { ModeEnum } from './enum/mode-enum';
import { TomEnum } from './enum/tom-enum';
import { User } from 'src/user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: "songs" })
export class Song extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column("enum", { enum: TomEnum})
  tonality: string;

  @Column("enum", { enum: ModeEnum})
  mode: string;

  @ManyToOne(
    () => User,
    user => user.songsICreated,
    { cascade: true, onDelete: "SET NULL", nullable: true}
  )
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}