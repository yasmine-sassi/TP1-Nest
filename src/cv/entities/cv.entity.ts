import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('cv')
export class CvEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column()
  age: number;

  @Column({
    unique: true,
  })
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne((type) => User, (user) => user.cvs, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs, { cascade: true })
  @JoinTable()
  skills: Skill[];
}
