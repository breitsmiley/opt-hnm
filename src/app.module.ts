import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "./modules/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./modules/config/config.service";

@Module({
  imports: [
      ConfigModule,
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useExisting: ConfigService,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
