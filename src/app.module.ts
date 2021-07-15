import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './shared/authz/authz.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleModule } from './role/role.module';
import { SeederModule } from './seeder.module';
import { PermissionModule } from './permission/permission.module';
import { logger } from './shared/middlewares/logger.middleware';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    AuthzModule,
    UserModule,
    AuthenticationModule,
    RoleModule,
    SeederModule,
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
