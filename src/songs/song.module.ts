import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { SongController } from './song.controller';
import { SongRepository } from './song.repository';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SongRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [SongController],
  providers: [SongService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class SongModule {}
