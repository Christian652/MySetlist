import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongDTO } from './dto/song.dto';
import { SongRepository } from './song.repository';
import { User } from 'src/user/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import { RandomSetlistDTO } from './dto/random-setlist.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongRepository)
    private SongRepository: SongRepository,
  ) { }

  public async getSongs(user: User): Promise<Song[]> {
    return await this.getByAuthor(user)
  }

  public async getRandomSetlist(randomSetlistDTO: RandomSetlistDTO): Promise<Song[]> {
    const { user, amountSongs, tonality } = randomSetlistDTO;
    const songs = await this.getByAuthor(user);
    const filtered = songs.filter(s => s.tonality == tonality);
    const ids = filtered.map(s => s.id);
    let setlist = [];

    while (setlist.length < amountSongs) {
      const randomId = Math.floor(Math.random() * ids.length) + 1;

      if (!setlist.find(i => i == randomId))
        setlist.push(randomId)
    }

    setlist = setlist.map(id => filtered.find(f => f.id == id));

    return setlist;
  }

  public async save(
    dto: SongDTO,
  ): Promise<Song> {
    try {
      return await this.SongRepository.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOne(id: string): Promise<Song> {
    const song = await this.SongRepository.findOne(id, {
      relations: ['user']
    });
    if (!song) throw new HttpException(`não foi encontrado nenhuma musica com o id: ${id}`, HttpStatus.NOT_FOUND);
    return song;
  }

  public async getByAuthor(user: User): Promise<Song[]> {
    return await this.SongRepository.getByUser(user);
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.SongRepository.delete(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}