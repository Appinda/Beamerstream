import fs from "fs";
import path from "path";

import Song from "../../domain/Song";
import { SongDao } from "../abstract/";

export default class SongDaoFileImpl implements SongDao {

  private songpath;
  private fileFormat = 1;

  public getSong(id: string): Promise<Song> {
    return this.readSongFromFile(id);
  }
  public getSongs(datadir: string): Promise<Song[]> {
    this.songpath = path.join(datadir, '/songs');
    return this.readAllSongs();
  }
  public write(song: Song): Promise<void> {
    let data = JSON.stringify({
      format: this.fileFormat,
      meta: song.meta,
      theme: song.themeid,
      lyrics: song.lyrics
    }, null, 1);
    return fs.promises.writeFile(this.getFilePath(song), data);
  }
  public delete(song: Song): Promise<void> {
    const path = this.getFilePath(song);
    throw new Error("Method not implemented.");
  }

  private getFilePath(song: Song): string {
    return path.join(this.songpath, song.meta.filename + '.json');
  }

  private async readSongFromFile(filename: string): Promise<Song> {
    const filepath = path.join(this.songpath, filename);
    const file = await fs.promises.readFile(filepath, {encoding: 'utf8'});
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
    let files = await fs.promises.readdir(this.songpath, {
      withFileTypes: true
    });
    let songs: Song[] = [];
    for(let filename of files){
      songs.push(await this.readSongFromFile(filename.name));
    }
    return songs;
  }
}