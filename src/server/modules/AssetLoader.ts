import Song, { SongMeta } from "./GraphQL/domain/Song";
import fs from "fs";
import path from "path";

declare type Songlist = SongMeta[];

const SONGPATH = path.join(__dirname, '../../assets/songs');

let SONGS: {[id: string]: Song} = {};

class AssetLoader {
  private async loadSongFromFile(filename): Promise<Song>{
    return new Promise((resolve, reject) => {
      const filepath = path.join(SONGPATH, filename + '.bss');
      fs.readFile(filepath, {encoding: 'utf8'}, (err,file) => {
        if(err || !file) { reject(err); return; }
        let rawsong = JSON.parse(file);
        resolve({
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
        });
      })
    });
  }
  private async readSongs (): Promise<string[]>{
    return await new Promise<string[]>((resolve, reject) => {
      fs.readdir(SONGPATH, (err, files) => {
        if(err) reject(err);
        resolve(files);
      });
    });
  }
  async loadSongMetas() {

    let filenames = await this.readSongs();
    let songs: Songlist = [];

    for(let filename of filenames){
      let strippedFilename = filename.slice(0, -4);
      let song;
      try {
        song = await this.loadSongFromFile(strippedFilename);
        SONGS[song.meta.id] = song;
      songs.push(song.meta);
      }catch(e){}
      
    };

    songs = songs.sort((a, b) => {
      if(a.name > b.name) return 1;
      if(a.name === b.name) return 0;
      return -1;
    });
    return songs;

  }
  public getSong(id: string): Song {
    if(SONGS.hasOwnProperty(id)){
      return SONGS[id];
    }
    else throw new Error("Song does not exists!");
  }
  public async getSonglist(): Promise<Songlist>{
    let songlist = await this.loadSongMetas();
    return songlist;
  }


  public preloadSongs(): Promise<boolean> {
    return new Promise((resolve) => {
      console.log("Loading songs..");
      setTimeout(() => {
        console.log("Loading songs..DONE");
        resolve(true);
      }, 4000);
    });
  }
}

export default new AssetLoader();