import Song, { SongMeta } from "../../domain/Song";

export default interface SongDao {
    
  getSong(id: string): Promise<Song>;
  getSongs(): Promise<Song[]>;
  write(song: Song): Promise<void>;
  delete(song: Song): Promise<void>;

}