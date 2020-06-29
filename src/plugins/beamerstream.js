// import Socket from "./socket";
import Transition from '~/modules/enums/Transition';

export default ({ app, store }, inject) => {
  
  let socket = null;

  function setupListeners(){
      console.log("SetupListeners");
  }

  class BeamerstreamService {

    constructor(){
      // socket = new Socket();
      setupListeners();
    }

    prepare(){
      // return socket.connect()
    }
    
    async prepareSonglist(){
      // Prepare songlist to be used in page
      let songlist = store.state.cache.songlist;
      let cached = true;
      // If songlist not loaded in cache (store), fetch it from server
      if(!songlist){
        // songlist = await socket.fetchSonglist();
        songlist = [];
        store.commit('cache/setSonglist', songlist);
        cached = false;
      }
      // Return
      return { cached }
    }

    setActiveSong(songid){
      socket.setActiveSong(songid);
    }

    setTransitionDisplay(value){
      // Validate value
      if(![Transition.BLACK, Transition.THEME, Transition.TEXT].includes(value)) throw new Error("value parameter must be a valid TransitionDisplay type");
      // Send to store
      store.commit('cache/setTransitionDisplay', value);
    }
    setTransitionType(value){
      // Validate value
      if(![Transition.CUT, Transition.FADE].includes(value)) throw new Error("value parameter must be a valid TransitionType type");
      // Send to store
      store.commit('cache/setTransitionType', value);
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}