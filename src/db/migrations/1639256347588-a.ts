import {MigrationInterface, QueryRunner} from "typeorm";

export class a1639256347588 implements MigrationInterface {
    name = 'a1639256347588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `profile_path` varchar(255) NULL, `password_reset_token` varchar(255) NULL, `password_reset_expires` timestamp NULL, `confirmation_token` varchar(255) NULL, `confirmated` tinyint NOT NULL DEFAULT 0, `password` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `storages` (`id` varchar(36) NOT NULL, `amount` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `stockerId` varchar(36) NULL, `productId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products` (`id` varchar(36) NOT NULL, `title` varchar(100) NOT NULL, `thumbnail` varchar(100) NULL, `status` tinyint NOT NULL DEFAULT '1', `description` text NULL, `unitPrice` decimal(5,2) NOT NULL, `details` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `settings` (`id` varchar(36) NOT NULL, `key` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products_stockers_users` (`productsId` varchar(36) NOT NULL, `usersId` varchar(36) NOT NULL, INDEX `IDX_a9602f2e9f5e7963e02a3a226d` (`productsId`), INDEX `IDX_ead85b86fceca1656365819f5e` (`usersId`), PRIMARY KEY (`productsId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `storages` ADD CONSTRAINT `FK_b89eec61b96b86b82d596512ef2` FOREIGN KEY (`stockerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `storages` ADD CONSTRAINT `FK_d21793a7f0fc54ef0f8e0e0b7d0` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_76ec85a3cf5734a18f3fecda246` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_stockers_users` ADD CONSTRAINT `FK_a9602f2e9f5e7963e02a3a226d6` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_stockers_users` ADD CONSTRAINT `FK_ead85b86fceca1656365819f5ec` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products_stockers_users` DROP FOREIGN KEY `FK_ead85b86fceca1656365819f5ec`");
        await queryRunner.query("ALTER TABLE `products_stockers_users` DROP FOREIGN KEY `FK_a9602f2e9f5e7963e02a3a226d6`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_76ec85a3cf5734a18f3fecda246`");
        await queryRunner.query("ALTER TABLE `storages` DROP FOREIGN KEY `FK_d21793a7f0fc54ef0f8e0e0b7d0`");
        await queryRunner.query("ALTER TABLE `storages` DROP FOREIGN KEY `FK_b89eec61b96b86b82d596512ef2`");
        await queryRunner.query("DROP INDEX `IDX_ead85b86fceca1656365819f5e` ON `products_stockers_users`");
        await queryRunner.query("DROP INDEX `IDX_a9602f2e9f5e7963e02a3a226d` ON `products_stockers_users`");
        await queryRunner.query("DROP TABLE `products_stockers_users`");
        await queryRunner.query("DROP TABLE `settings`");
        await queryRunner.query("DROP TABLE `products`");
        await queryRunner.query("DROP TABLE `storages`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `log`");
    }

}
