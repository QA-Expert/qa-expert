import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PageProgressModule } from '../page-progresses/page-progress.module';
import { UserModule } from '../users/user.module';
import { PageResolver } from './page.resolver';
import { Page, PageSchema } from './page.schema';
import { PageService } from './page.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    UserModule,
    PageProgressModule,
    ConfigModule,
  ],
  providers: [PageService, PageResolver, JwtService],
  exports: [PageService],
})
export class PageModule {}
