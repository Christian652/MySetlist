import {MigrationInterface, QueryRunner} from "typeorm";

export class a1639324695021 implements MigrationInterface {
    name = 'a1639324695021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `settings` CHANGE `key` `key` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `settings` ADD UNIQUE INDEX `IDX_c8639b7626fa94ba8265628f21` (`key`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `settings` DROP INDEX `IDX_c8639b7626fa94ba8265628f21`");
        await queryRunner.query("ALTER TABLE `settings` CHANGE `key` `key` varchar(255) NOT NULL");
    }

}
