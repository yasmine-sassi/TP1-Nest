import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Provides UserRepository
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // Export both service and TypeORM module
})
export class UserModule {}
