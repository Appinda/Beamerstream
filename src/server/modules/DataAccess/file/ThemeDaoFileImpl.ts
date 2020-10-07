import Theme, { ThemeMeta } from "../../domain/Theme";
import { ThemeDao } from "../abstract/";

export default class ThemeDaoFileImpl implements ThemeDao {

  getTheme(id: string): Theme {
    console.error("Method not implemented");
    return null;
  }
  getThemelist(): ThemeMeta[] {
    console.error("Method not implemented");
    return [];
  }
  
}