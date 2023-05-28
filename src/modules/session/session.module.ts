import { Session } from '@app/entities/Session';
import { SessionProviders } from '@app/modules/session/session.providers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [...SessionProviders],
  exports: [...SessionProviders],
})
export class SessionModule {}
