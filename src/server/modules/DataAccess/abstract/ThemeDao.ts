import Theme, { ThemeMeta } from "../../domain/Theme";

export default interface ThemeDao {
  
  getTheme(id: string): Theme
  getThemelist(): ThemeMeta[]

}