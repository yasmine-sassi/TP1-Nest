import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class timestempEntities{
  @CreateDateColumn(
    {
      update:false
    }
  )
  createdAT: Date;
  @DeleteDateColumn()
  deletedAT : Date
  @UpdateDateColumn()
  updatedAT: Date

}