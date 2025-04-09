import { CvEntity } from 'src/cv/entities/cv.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @ManyToMany(() => CvEntity, cv => cv.skills)
  cvs: CvEntity[];
}