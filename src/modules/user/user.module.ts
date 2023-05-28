import { User } from '@app/entities/User';
import { UserServiceProviders } from '@app/modules/user/user.providers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [...UserServiceProviders],
  exports: [...UserServiceProviders],
})
export class UserModule {}
