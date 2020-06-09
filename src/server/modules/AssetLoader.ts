import Song, { SongMeta } from "../obj/Song";
import fs from "fs";
import path from "path";
import { raw } from "express";
import Utils from "./Utils";

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
          lyrics: rawsong.lyrics,
          meta: {
            author: rawsong.meta.author,
            ccli: rawsong.meta.ccli,
            filename: filename,
            id: Utils.getNewObjectID(),
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
}

export default AssetLoader;