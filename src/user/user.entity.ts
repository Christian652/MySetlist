
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, OneToMany, ManyToMany, UpdateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { Song } from 'src/songs/song.entity';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: Role;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(
    () => Song,
    song => song.author
  )
  songsICreated: Song[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}