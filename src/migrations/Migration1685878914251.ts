
          import { MigrationInterface, QueryRunner } from "typeorm";
  
          export class Migration1685878914251 implements MigrationInterface {
            name = 'Migration1685878914251'
  
            public async up(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("DROP INDEX `IDX_408121abfd27d0bc8ce763dcd1` ON `user`");
await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(128) NULL");
await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(128) NULL");
await queryRunner.query("ALTER TABLE `company` ADD UNIQUE INDEX `IDX_b0fc567cf51b1cf717a9e8046a` (`email`)");
            }
  
            public async down(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("CREATE UNIQUE INDEX `IDX_408121abfd27d0bc8ce763dcd1` ON `user` (`owned_company_Id`)");
await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
await queryRunner.query("ALTER TABLE `company` DROP INDEX `IDX_b0fc567cf51b1cf717a9e8046a`");
            }
          }
        