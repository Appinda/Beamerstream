import Theme, { ThemeMeta } from "../../domain/Theme";
import state from "../../GraphQL/AppState";

export default class ThemeService {

  getSong(id: string): Theme {
    return state.themes.find(e => e.meta.id == id);
  }
  getSonglist(): ThemeMeta[] {
    return state.themes.map(e => e.meta);
  }

}