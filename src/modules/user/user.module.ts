import { User } from '@app/entities/User';
import { UserServiceProviders } from '@app/modules/user/user.providers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
const { Services, Repositories } = UserServiceProviders;
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [...Services, ...Repositories],
  exports: [...Services, ...Repositories],
})
export class UserModule {}
