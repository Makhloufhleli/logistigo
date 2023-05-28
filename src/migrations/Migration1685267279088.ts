import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1685267279088 implements MigrationInterface {
  name = 'Migration1685267279088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_8cce035ecb7580933eb6dd9aaa9`');
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `companyEmployeeId` `employingCompanyId` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_fc0c9f8150a5ae879f608fc602f` FOREIGN KEY (`employingCompanyId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_8cce035ecb7580933eb6dd9aaa9` FOREIGN KEY (`companyEmployeeId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `employingCompanyId` `companyEmployeeId` int NULL',
    );
    await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_fc0c9f8150a5ae879f608fc602f`');
  }
}
