import Song, { SongMeta } from "../../domain/Song";
import state from "../../GraphQL/AppState";
import { SongDao } from "../abstract";
import { SongDaoFileImpl } from "../file";

export default class SongService {

  private songDao: SongDao = new SongDaoFileImpl();

  async preload(): Promise<boolean> {
    state.songlist = await this.songDao.getSongs();
    return true;
  }

  getSong(id: string): Song {
    return state.songlist.find(e => e.meta.id == id);
  }
  getSonglist(): SongMeta[] {
    return state.songlist.map(e => e.meta);
  }

}