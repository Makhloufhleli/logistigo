
          import { MigrationInterface, QueryRunner } from "typeorm";
  
          export class Migration1684082228772 implements MigrationInterface {
            name = 'Migration1684082228772'
  
            public async up(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("CREATE TABLE `invoice` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `mission` (`id` int NOT NULL AUTO_INCREMENT, `formula` varchar(255) NOT NULL, `geographicAddress` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `company` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `siret` varchar(255) NULL, `payed` tinyint NULL, `address` varchar(255) NULL, `email` varchar(255) NULL, `numberOfAgents` int NULL, `tva` double NULL, `logo` varchar(255) NULL, `type` enum ('LIMITED_LIABILITY', 'PUBLIC_LISTED', 'LIMITED_COMPANY', 'UNLIMITED_COMPANY', 'NON_PROFIT', 'PARTNERSHIP', 'CORPORATION', 'PRIVATE_COMPANY_LIMITED', 'SMALL_BUSINESS') NOT NULL DEFAULT 'SMALL_BUSINESS', `natureOfBusiness` varchar(255) NULL, `optimizationTarget` varchar(255) NULL, `capital` double NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `code` varchar(255) NULL, `intraCommunityTva` varchar(255) NULL, `homeAddress` varchar(255) NULL, `depositAddress` varchar(255) NULL, `reference` varchar(255) NULL, `invoiceReference` varchar(255) NULL, `rules` varchar(255) NULL, INDEX `IDX_6552f91b22b29add87eb9c5df2` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `file` (`id` int NOT NULL AUTO_INCREMENT, `path` varchar(255) NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `clientId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `vehicle` (`id` int NOT NULL AUTO_INCREMENT, `reference` varchar(255) NOT NULL, `fuelType` varchar(255) NOT NULL, `api` varchar(255) NOT NULL, `status` enum ('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE', `registrationNumber` varchar(255) NOT NULL, `type` enum ('CAR', 'TRUCK', 'MOTORCYCLE', 'BUS', 'VAN', 'OTHER') NOT NULL DEFAULT 'CAR', `mark` varchar(255) NOT NULL, `model` varchar(255) NOT NULL, `modelYear` varchar(255) NOT NULL, `permissibleDate` datetime NOT NULL, `releaseDate` datetime NOT NULL, `fuel` varchar(255) NOT NULL, `gearBox` varchar(255) NOT NULL, `numberOfDoors` varchar(255) NOT NULL, `numberOfPlaces` varchar(255) NOT NULL, `fiscalPower` varchar(255) NOT NULL, `dynamicPower` varchar(255) NOT NULL, `drivingLicense` varchar(255) NOT NULL, `mileAge` varchar(255) NOT NULL, `color` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `irregularity` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, `amount` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `vehicleId` int NULL, `driverId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(128) NULL, `photo` varchar(255) NULL, `address` varchar(255) NULL, `role` enum ('SUPER_ADMIN', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `type` varchar(255) NULL, `drivingLicense` varchar(255) NULL, `qualifications` varchar(255) NULL, `status` enum ('ACTIVE', 'INACTIVE', 'DELETED') NULL DEFAULT 'ACTIVE', `state` varchar(255) NULL, `reference` varchar(255) NULL, `companyEmployeeId` int NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), INDEX `IDX_31ef2b4d30675d0c15056b7f6e` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("CREATE TABLE `session` (`id` int NOT NULL AUTO_INCREMENT, `userAgent` varchar(255) NOT NULL, `ipAddress` varchar(255) NOT NULL, `token` text NULL, `isExpired` tinyint NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
await queryRunner.query("ALTER TABLE `invoice` ADD CONSTRAINT `FK_78299c9ae0f0236a353338e3c8a` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `mission` ADD CONSTRAINT `FK_51661ce109a2fec0443d40ce0b6` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `file` ADD CONSTRAINT `FK_bff79dfafb2147156b2238f9455` FOREIGN KEY (`clientId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `irregularity` ADD CONSTRAINT `FK_da1851bfba141164daca2c8aa31` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `irregularity` ADD CONSTRAINT `FK_60e24e9830f8eaf477db5939d0f` FOREIGN KEY (`driverId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_8cce035ecb7580933eb6dd9aaa9` FOREIGN KEY (`companyEmployeeId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
await queryRunner.query("ALTER TABLE `session` ADD CONSTRAINT `FK_3d2f174ef04fb312fdebd0ddc53` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            }
  
            public async down(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.query("DROP TABLE `invoice`");
await queryRunner.query("DROP TABLE `mission`");
await queryRunner.query("DROP TABLE `company`");
await queryRunner.query("DROP INDEX `IDX_6552f91b22b29add87eb9c5df2` ON `company`");
await queryRunner.query("DROP TABLE `file`");
await queryRunner.query("DROP TABLE `vehicle`");
await queryRunner.query("DROP TABLE `irregularity`");
await queryRunner.query("DROP TABLE `user`");
await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
await queryRunner.query("DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`");
await queryRunner.query("DROP TABLE `session`");
await queryRunner.query("ALTER TABLE `invoice` DROP FOREIGN KEY `FK_78299c9ae0f0236a353338e3c8a`");
await queryRunner.query("ALTER TABLE `mission` DROP FOREIGN KEY `FK_51661ce109a2fec0443d40ce0b6`");
await queryRunner.query("ALTER TABLE `file` DROP FOREIGN KEY `FK_bff79dfafb2147156b2238f9455`");
await queryRunner.query("ALTER TABLE `irregularity` DROP FOREIGN KEY `FK_da1851bfba141164daca2c8aa31`");
await queryRunner.query("ALTER TABLE `irregularity` DROP FOREIGN KEY `FK_60e24e9830f8eaf477db5939d0f`");
await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_8cce035ecb7580933eb6dd9aaa9`");
await queryRunner.query("ALTER TABLE `session` DROP FOREIGN KEY `FK_3d2f174ef04fb312fdebd0ddc53`");
            }
          }
        