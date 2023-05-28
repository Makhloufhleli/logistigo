import { JwtProviders } from '@app/modules/jwt/jwt.providers';
import { SessionModule } from '@app/modules/session/session.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SessionModule, UserModule],
  providers: [...JwtProviders],
  exports: [...JwtProviders],
})
export class JwtModule {}
