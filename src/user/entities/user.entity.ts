import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => CvEntity, (cv) => cv.user)
  cvs: CvEntity[];




}
