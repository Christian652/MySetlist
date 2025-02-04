import { Repository, EntityRepository } from 'typeorm';
import { Song } from './song.entity';
import { SongDTO } from './dto/song.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {

  public async saveSong(
    dto: SongDTO,
  ): Promise<Song> {
    const {
      id, title, unitPrice, description, details,
      status, stockers, author, thumbnail
    } = dto;
    
    const song = this.create();
    song.id = id ? id : null;
    song.stockers = stockers;
    song.status = status ? status : true;
    song.thumbnail = thumbnail;
    song.title = title;
    song.unitPrice = unitPrice;
    song.details = details;
    song.description = description;
    song.author = author;
    return await song.save();
  }

  public async getAll(): Promise<Song[]> {  
    return await this.find({ relations: ['user'] })
  }

  public async getByUser(user: User): Promise<Song[]> {
    const songs = await this.getAll();

    return songs.filter(song => song.user == user);
  }
}