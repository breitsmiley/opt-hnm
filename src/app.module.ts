import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "./modules/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./modules/config/config.service";
import { ApiModule } from './modules/api/api.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService,
        }),
        ApiModule,
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {
}
