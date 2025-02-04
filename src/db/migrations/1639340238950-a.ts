import {MigrationInterface, QueryRunner} from "typeorm";

export class a1639340238950 implements MigrationInterface {
    name = 'a1639340238950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `storages` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `storages` ADD `deleted_at` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `storages` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `storages` DROP COLUMN `updated_at`");
    }

}
