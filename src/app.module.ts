import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleModule } from './role/role.module';
import { SeedsModule } from './shared/seeder/seeds.module';
import { PermissionModule } from './permission/permission.module';
import { logger } from './shared/middlewares/logger.middleware';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthzModule,
    UserModule,
    AuthenticationModule,
    RoleModule,
    SeedsModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('auth');
  }
}
