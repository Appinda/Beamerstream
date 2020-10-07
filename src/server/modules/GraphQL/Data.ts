import { Liturgy, Song, Theme, TransitionType } from "./domain";

class Data {
  public transitionType: TransitionType = {
    ease: "cut",
    easeDuration: 0,
    display: "text"
  };
  public songlist: Song[] = [];
  public liturgy: Liturgy = {
    items: []
  };
  public activeSong: Song = null;
  public themes: Theme[] = [
    {
      meta: {
        id: 'f9abb6b5-7c52-44a5-b824-0922e67791ef',
        filename: 'Theme1.bst',
        name: 'Default'
      },
      fontSize: 22
    }
  ];  
}

export default new Data();