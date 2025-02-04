import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  Req,
  ParseUUIDPipe
} from '@nestjs/common';
import { SongService } from './song.service';
import { SongDTO } from './dto/song.dto';
import { Song } from './song.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('songs')
export class SongController {
  constructor(
    private songService: SongService
  ) { }

  @Post()
  @Roles(Role.Admin, Role.Singer)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() songDTO: SongDTO,
  ): Promise<any> {
    try {
      return await this.songService.save(songDTO);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Singer)
  public async getAll(@Req() req): Promise<Song[]> {
    try {
      return await this.songService.getSongs(req.user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @Roles(Role.Admin, Role.Singer)
  public async getOne(@Param("id", ParseUUIDPipe) id: string): Promise<any> {
    try {
      return await this.songService.getOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  @Roles(Role.Admin, Role.Singer)
  public async delete(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<any> {
    try {
      return await this.songService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}