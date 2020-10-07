import Theme, { ThemeMeta } from "../../domain/Theme";

export default interface SongDao {
  
  getTheme(id: string): Theme
  getThemelist(): ThemeMeta[]

}