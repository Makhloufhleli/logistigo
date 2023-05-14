export const SETUP_SERVICE = 'SETUP_SERVICE';

export interface ISetupService {
  createDatabase(): Promise<boolean>;
  dropDatabase(): Promise<boolean>;
}
