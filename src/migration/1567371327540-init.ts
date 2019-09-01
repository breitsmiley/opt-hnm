import {MigrationInterface, QueryRunner} from "typeorm";

export class init1567371327540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consortium" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_4824052d8c31b96eb2205e803cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization_consortiums_consortium" ("organizationId" integer NOT NULL, "consortiumId" integer NOT NULL, CONSTRAINT "PK_f6184ea7334d41e3002fd388abe" PRIMARY KEY ("organizationId", "consortiumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3dc8827cab89a748ed623b8a33" ON "organization_consortiums_consortium" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cbefdc26034b87cfc52cbca29c" ON "organization_consortiums_consortium" ("consortiumId") `);
        await queryRunner.query(`ALTER TABLE "organization_consortiums_consortium" ADD CONSTRAINT "FK_3dc8827cab89a748ed623b8a339" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_consortiums_consortium" ADD CONSTRAINT "FK_cbefdc26034b87cfc52cbca29c6" FOREIGN KEY ("consortiumId") REFERENCES "consortium"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_consortiums_consortium" DROP CONSTRAINT "FK_cbefdc26034b87cfc52cbca29c6"`);
        await queryRunner.query(`ALTER TABLE "organization_consortiums_consortium" DROP CONSTRAINT "FK_3dc8827cab89a748ed623b8a339"`);
        await queryRunner.query(`DROP INDEX "IDX_cbefdc26034b87cfc52cbca29c"`);
        await queryRunner.query(`DROP INDEX "IDX_3dc8827cab89a748ed623b8a33"`);
        await queryRunner.query(`DROP TABLE "organization_consortiums_consortium"`);
        await queryRunner.query(`DROP TABLE "consortium"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
