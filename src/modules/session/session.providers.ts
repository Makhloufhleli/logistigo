import { SessionRepository } from '@app/modules/session/session.repository';
import { SESSION_REPOSITORY } from '@app/modules/session/session.repository.interface';
import { SessionService } from '@app/modules/session/session.service';
import { SESSION_SERVICE } from '@app/modules/session/session.service.interface';
import { Provider } from '@nestjs/common';

export const SessionProviders: Provider[] = [
  { provide: SESSION_REPOSITORY, useClass: SessionRepository },
  { provide: SESSION_SERVICE, useClass: SessionService },
];
