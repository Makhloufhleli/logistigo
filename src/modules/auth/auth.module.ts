import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthProviders } from '@app/modules/auth/auth.providers';
import { JwtModule } from '@app/modules/jwt/jwt.module';
import { SessionModule } from '@app/modules/session/session.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, JwtModule, SessionModule],
  controllers: [AuthController],
  providers: [...AuthProviders],
  exports: [...AuthProviders],
})
export class AuthModule {}
