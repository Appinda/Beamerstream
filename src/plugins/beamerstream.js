import Socket from "./socket";
import Transition from '~/modules/enums/Transition';

export default ({ app, store }, inject) => {
  
  class BeamerstreamService {
  
    constructor(){
      this.socket = new Socket();
    }

  
    prepare(){
      return this.socket.connect()
    }
    
    async prepareSonglist(){
      // Prepare songlist to be used in page
      let songlist = store.state.cache.songlist;
      let cached = true;
      // If songlist not loaded in cache (store), fetch it from server
      if(!songlist){
        songlist = await this.socket.fetchSonglist();
        store.commit('cache/setSonglist', songlist);
        cached = false;
      }
      // Return
      return { cached }
    }

    setTransitionDisplay(value){
      if(![Transition.BLACK, Transition.THEME, Transition.TEXT].includes(value)) throw new Error("value parameter must be a valid TransitionDisplay type");
      store.commit('cache/setTransitionDisplay', value);
    }
    setTransitionType(value){
      if(![Transition.CUT, Transition.FADE].includes(value)) throw new Error("value parameter must be a valid TransitionType type");
      store.commit('cache/setTransitionType', value);
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}