
          import { MigrationInterface, QueryRunner } from "typeorm";
  
          export class Migration1685267586937 implements MigrationInterface {
            name = 'Migration1685267586937'
  
            public async up(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_fc0c9f8150a5ae879f608fc602f`");
await queryRunner.query("ALTER TABLE `user` DROP COLUMN `employingCompanyId`");
await queryRunner.query("ALTER TABLE `user` ADD `owned_company_Id` int NULL");
await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_408121abfd27d0bc8ce763dcd1` (`owned_company_Id`)");
await queryRunner.query("ALTER TABLE `user` ADD `employing_company_Id` int NULL");
await queryRunner.query("CREATE UNIQUE INDEX `REL_408121abfd27d0bc8ce763dcd1` ON `user` (`owned_company_Id`)");
await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_408121abfd27d0bc8ce763dcd17` FOREIGN KEY (`owned_company_Id`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_067aecf5a05ea55ddc17e551bb4` FOREIGN KEY (`employing_company_Id`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            }
  
            public async down(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_fc0c9f8150a5ae879f608fc602f` FOREIGN KEY (`employingCompanyId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `user` ADD `employingCompanyId` int NULL");
await queryRunner.query("ALTER TABLE `user` DROP COLUMN `owned_company_Id`");
await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_408121abfd27d0bc8ce763dcd1`");
await queryRunner.query("ALTER TABLE `user` DROP COLUMN `employing_company_Id`");
await queryRunner.query("DROP INDEX `REL_408121abfd27d0bc8ce763dcd1` ON `user`");
await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_408121abfd27d0bc8ce763dcd17`");
await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_067aecf5a05ea55ddc17e551bb4`");
            }
          }
        