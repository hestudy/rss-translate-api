import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRssTable1738135530602 implements MigrationInterface {
  name = 'UpdateRssTable1738135530602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_origin" DROP COLUMN "data"`);
    await queryRunner.query(`ALTER TABLE "rss_origin" ADD "data" json`);
    await queryRunner.query(`ALTER TABLE "rss_item" DROP COLUMN "data"`);
    await queryRunner.query(`ALTER TABLE "rss_item" ADD "data" json NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_item" DROP COLUMN "data"`);
    await queryRunner.query(
      `ALTER TABLE "rss_item" ADD "data" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "rss_origin" DROP COLUMN "data"`);
    await queryRunner.query(
      `ALTER TABLE "rss_origin" ADD "data" character varying`,
    );
  }
}
