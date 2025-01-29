import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRssTable1738137789367 implements MigrationInterface {
  name = 'UpdateRssTable1738137789367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_origin" ADD "job" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_origin" DROP COLUMN "job"`);
  }
}
