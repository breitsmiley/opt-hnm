import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


export interface EnvConfig {
    [key: string]: any;
}

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory  {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),

            APP_DB_HOST: Joi.string().required(),
            APP_DB_PORT: Joi.number().required(),
            APP_DB_USERNAME: Joi.string().required(),
            APP_DB_PASSWORD: Joi.string().required(),
            APP_DB_DATABASE: Joi.string().required(),
        });

        const {error, value: validatedEnvConfig} = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get isProdEnv(): boolean {
        return Boolean(this.envConfig.NODE_ENV === 'production');
    }

    get isDevEnv(): boolean {
        return Boolean(this.envConfig.NODE_ENV === 'development');
    }

    /**
     * TYPEORM async configuration
     * https://docs.nestjs.com/techniques/database
     */
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.envConfig.APP_DB_HOST,
            port: this.envConfig.APP_DB_PORT,
            username: this.envConfig.APP_DB_USERNAME,
            password: this.envConfig.APP_DB_PASSWORD,
            database: this.envConfig.APP_DB_DATABASE,
            keepConnectionAlive: true,
            entities: [
                // TODO https://github.com/typeorm/typeorm/issues/420#issuecomment-393316360
                __dirname + '/../../modules/**/entity/*.entity.{js,ts}',
            ],
            migrations: [
                __dirname + '/../../migration/*.{js,ts}'
            ],
            cli: {
                migrationsDir: 'src/migration'
            },
            synchronize: false,
        };
    }
}
