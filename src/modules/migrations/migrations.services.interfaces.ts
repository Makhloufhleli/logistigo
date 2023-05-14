export const MIGRATIONS_SERVICE = 'MIGRATIONS_SERVICE';
export interface IMigrationsService {
  runMigration(): Promise<void>;
  generateMigration(): Promise<boolean>;
  revertMigration(): Promise<void>;
}
