import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiService } from "./modules/api/api.service";

@Controller()
export class AppController {
    constructor(
      private readonly appService: AppService,
      private readonly apiService: ApiService
    ) {

    }

    @Get()
    getHello(): string {
        this.apiService.test();
        return this.appService.getHello();
    }
}
