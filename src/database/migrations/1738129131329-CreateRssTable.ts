import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRssTable1738129131329 implements MigrationInterface {
  name = 'CreateRssTable1738129131329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rss_origin" ("data" character varying, "url" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7daf15adcbfd8c70ea870f24c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rss_item" ("data" character varying NOT NULL, "content" character varying, "title" character varying, "url" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rssOriginId" uuid NOT NULL, CONSTRAINT "PK_09289f2d16c1560380e085feb20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_item" ADD CONSTRAINT "FK_e3af98ee40c23c1cef4159043bf" FOREIGN KEY ("rssOriginId") REFERENCES "rss_origin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_item" DROP CONSTRAINT "FK_e3af98ee40c23c1cef4159043bf"`,
    );
    await queryRunner.query(`DROP TABLE "rss_item"`);
    await queryRunner.query(`DROP TABLE "rss_origin"`);
  }
}
