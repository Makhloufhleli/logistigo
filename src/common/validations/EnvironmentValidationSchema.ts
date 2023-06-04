import { environmentConstants } from '@app/constants/environment.constants';
import * as JOI from 'JOI';

const { environment } = environmentConstants;

export const EnvironmentSchema = JOI.object({
  [environment.NODE_ENV]: JOI.string().required(),
  [environment.SERVER_PORT]: JOI.number().required(),
  [environment.DB_ENGINE]: JOI.string().required(),
  [environment.DB_HOST]: JOI.string().required(),
  [environment.DB_PORT]: JOI.number().required(),
  [environment.DB_USER]: JOI.string().required(),
  [environment.DB_NAME]: JOI.string().required(),
  [environment.ACCESS_TOKEN_SECRET]: JOI.string().required(),
  [environment.ACCESS_TOKEN_TIME_TO_LIVE]: JOI.string().required(),
  [environment.REFRESH_TOKEN_SECRET]: JOI.string().required(),
  [environment.REFRESH_TOKEN_TIME_TO_LIVE]: JOI.string().required(),
  [environment.SMTP_HOST]: JOI.string().required(),
  [environment.SMTP_PORT]: JOI.string().required(),
  [environment.SMTP_USER]: JOI.string().required(),
  [environment.SMTP_PASSWORD]: JOI.string().required(),
  [environment.DEFAULT_FROM_EMAIL]: JOI.string().required(),
});
