import { Module, NestModule } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SongModule } from './songs/song.module';
import { RolesModule } from './roles/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmData()),
    UserModule, AuthModule, SongModule, RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

}


