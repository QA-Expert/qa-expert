import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

const cmd = `curl -s http://checkip.amazonaws.com || printf "0.0.0.0"`;
const pubIp = execSync(cmd).toString().trim();

console.log(`My public IP address is: ${pubIp}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(app.get(ConfigService).port);
}
bootstrap();
