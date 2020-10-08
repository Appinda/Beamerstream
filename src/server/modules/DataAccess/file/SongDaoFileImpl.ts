import fs from "fs-extra";
import path from "path";

import Song, { SongMeta } from "../../domain/Song";
import { SongDao } from "../abstract/";

export default class SongDaoFileImpl implements SongDao {

  private songpath = path.join(__dirname, '../../../../assets/songs');
  private fileFormat = 1;

  public getSong(id: string): Promise<Song> {
    return this.readSongFromFile(id);
  }
  public getSongs(): Promise<Song[]> {
    return this.readAllSongs();
  }
  public write(song: Song): Promise<void> {
    let data = JSON.stringify({
      format: this.fileFormat,
      meta: song.meta,
      theme: song.themeid,
      lyrics: song.lyrics
    }, null, 1);
    return fs.writeFile(this.getFilePath(song), data);
  }
  public delete(song: Song): Promise<void> {
    const path = this.getFilePath(song);
    return fs.remove(path);
  }

  private getFilePath(song: Song): string {
    return path.join(this.songpath, song.meta.filename + '.json');
  }

  private async readSongFromFile(filename: string): Promise<Song> {
    const filepath = path.join(this.songpath, filename);
    const file = await fs.readFile(filepath, {encoding: 'utf8'});
    const rawsong = JSON.parse(file);
    return {
      lyrics: {
        order: rawsong.lyrics.order,
        verses: Object.keys(rawsong.lyrics).filter(x => x != "order").map(x => ({ name: x, text: rawsong.lyrics[x] }))
      },
      meta: {
        author: rawsong.meta.author,
        ccli: rawsong.meta.ccli,
        filename: filename,
        id: rawsong.meta.id,
        name: rawsong.meta.name,
      },
      themeid: rawsong.theme
    };
  }

  private async readAllSongs(): Promise<Song[]>{
    let files = await fs.readdir(this.songpath);
    let songs: Song[] = [];
    for(let filename of files){
      songs.push(await this.readSongFromFile(filename));
    }
    return songs;
  }
}