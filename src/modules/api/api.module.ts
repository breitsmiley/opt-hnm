import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsortiumRepository, OrganizationRepository } from "./repository";
import { ApiService } from './api.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationRepository,
            ConsortiumRepository
        ])
    ],
    providers: [ApiService],
    exports: [ApiService]
})
export class ApiModule {
}
