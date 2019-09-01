import { ConfigService } from "./src/modules/config/config.service";

const configService = new ConfigService('.env');
const config = configService.createTypeOrmOptions();
export = config;